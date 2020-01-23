const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const constants = require(`${root}/const`);
const Promise = require('bluebird');
// const admin = Promise.promisifyAll(require('firebase-admin'));
const admin = require('firebase-admin');
const defaultConfig = require(path.resolve('.', 'const')).firebase;

admin.initializeApp({
  databaseURL: `https://${process.env.FIREBASE_ID}.firebaseio.com`,
  credential: admin.credential.cert({
    ...defaultConfig,
    type: 'service_account',
    project_id: process.env.FIREBASE_ID,
    private_key_id: process.env.FIREBASE_KEY_ID,
    client_email: process.env.FIREBASE_SA,
    client_id: process.env.FIREBASE_CLIENT_ID,
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_SA)}`,
  }),
});

module.exports.notification = async (req, _) => {
  const { payload } = req;
  const t = await Model.Transaction.findOne({
    raw: true,
    where: { id: payload.id },
  });
  const u = await Model.User.findOne({
    raw: true,
    where: { id: t.userId },
  });

  const receiver = payload.From.toLowerCase() === 'walker' ? 'userId' : 'walkerId';
  const r = await Model.User.findOne({
    raw: true,
    where: {
      id: t[receiver],
    },
  });
  
  const message = r.token ? null : 'Perangkat user belum terdaftar!';
  if (message) return {
    ...constants['404'],
    message,
  };

  const data = !(payload.From === 'Customer') ? {
    From: payload.From,
    description: payload.description,
  } : {
    From: payload.From,
    photo: u.photo || '',
    description: payload.description,
    date: t.walkDate,
    id: `${payload.id}`,
    duration: `${t.duration}`,
  };
  await Promise.promisifyAll(admin.messaging().send({
    data,
    token: r.token,
    notification: {
      title: payload.title,
      body: payload.body,
    },
  }));

  return {
    ...constants['200'],
    body: null,
  };
};

const path = require('path');
const admin = require("firebase-admin");
const defaultConfig = require(path.resolve('.', 'const')).firebase;

admin.initializeApp({
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
  credential: admin.credential.cert({
    ...defaultConfig,
    type: 'service_account',
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.FIREBASE_KEY_ID,
    client_email: process.env.FIREBASE_SA,
    client_id: process.env.FIREBASE_CLIENT_ID,
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_SA)}`,
  }),
});

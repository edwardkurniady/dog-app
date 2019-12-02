const fs = require('fs');
const path = require('path');
const root = path.resolve('.');
const Bounce = require('bounce');
const Promise = require('bluebird');
const { Storage } = require('@google-cloud/storage');
const constants = require(`${root}/const`);
const { dog } = require('../services');

module.exports.register = async (req, h) => {
  try {
    // await dog.register(req.payload);
    const stream = req.payload.photo;
    const filename = stream.hapi.filename;

    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: `${root}/config/bucket.json`,
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(filename);

    stream.pipe(file.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
      },
    }));


    bucket.makePublic();
    await file.makePublic();

    return stream.hapi;
    // return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.get = async (req, h) => {
  try {
    return dog.getList(req.params.user, req.query);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

const fs = require('fs');
const path = require('path');
const root = path.resolve('.');
const Bounce = require('bounce');
const { dog } = require('../services');
const constants = require(`${root}/const`);

module.exports.register = async (req, h) => {
  try {
    // await dog.register(req.payload);
    const result = [];
    const stream = req.payload.photo;

    console.log(stream._data)
    stream.pipe(fs.createWriteStream(`${root}/uploads/${stream.hapi.filename}`));

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

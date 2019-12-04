const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { storageURL } = require(path.resolve('.', 'const'));

module.exports.upload = async (stream, id, type) => {
  if (!stream) return null;
  const dir = type.split('/');
  const filename = `${dir[0]}/${id}/${dir[1]}`;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: path.resolve('.', 'config/bucket.json'),
  });
  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(filename);

  stream.pipe(file.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
    },
  }));

  return `${storageURL}/${process.env.BUCKET_NAME}/${filename}`;
};

module.exports.delete = async (id, type) => {
  const dir = type.split('/');
  const filename = `${dir[0]}/${id}/${dir[1]}`;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: path.resolve('.', 'config/bucket.json'),
  });
  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(filename);

  await file.delete();
};

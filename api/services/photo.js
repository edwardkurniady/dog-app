const path = require('path');
const { storageURL } = require(path.resolve('.', 'const'));
const { Storage } = require('@google-cloud/storage');

const initiateBucket = () => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: path.resolve('.', 'config/bucket.json'),
  });
  return storage.bucket(process.env.BUCKET_NAME);
};

module.exports.upload = async (stream, id, type) => {
  if (!stream) return null;
  const dir = type.split('/');
  const filename = `${dir[0]}/${id}/${dir[1]}`;

  const bucket = initiateBucket();
  const file = bucket.file(filename);

  const pipe = (st, f) => {
    const opt = {
      gzip: true,
      public: true,
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          custom: 'metadata',
        },
      },
    };
    return new Promise((resolve, reject) => {
      st.pipe(f.createWriteStream(opt))
        .on('finish', resolve)
        .on('error', reject);
    });
  };

  await pipe(stream, file);

  return file.getSignedUrl({ action: read });
};

module.exports.update = async (type, oldId, newId) => {
  if (!newId) return null;
  const dir = type.split('/');
  const oldName = `${dir[0]}/${oldId}/${dir[1]}`;
  const newName = `${dir[0]}/${newId}/${dir[1]}`;

  const bucket = initiateBucket();
  const oldFile = bucket.file(oldName);
  await oldFile.copy(newName);
  await oldFile.delete();
  
  return bucket.file(newName).getSignedUrl({ action: read });
};

module.exports.delete = async (id, type) => {
  const dir = type.split('/');
  const filename = `${dir[0]}/${id}/${dir[1]}`;

  const bucket = initiateBucket();
  const file = bucket.file(filename);

  await file.delete();
};

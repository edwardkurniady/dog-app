const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.find = async (id) => {
  return Model.Post.findOne({
    raw: true,
    where: { id },
  });
};

module.exports.get = async (userId) => {
  return Model.Post.findAll({
    raw: true,
    where: { userId },
  });
};

module.exports.upload = async (data) => {
  await Model.Post.create(data);
};

module.exports.update = async (data) => {
  await Model.Post.update(data, {
    where: { id: data.id },
  });
};

module.exports.delete = async (id) => {
  await Model.Post.destroy({
    where: { id },
  });
};

module.exports.hasLiked = async (data) => {
  return Model.PostLike.findOne({
    where: data,
  });
};

module.exports.like = async (data, likes) => {
  await Model.PostLike.create(data);
  await Model.Post.update({ likes }, {
    where: { id: data.postId },
  });
};

module.exports.unlike = async (postlike, likes, id) => {
  await postlike.destroy();
  await Model.Post.update({ likes }, {
    where: { id },
  });
};

const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.find = async (id, userId) => {
  const post = await Model.Post.findOne({
    raw: true,
    where: { id },
  });

  const lbu = await this.hasLiked(userId, id);
  if (post) post.likedByUser = lbu ? true : false;

  return post;
};

module.exports.get = async (userId, searcher) => {
  searcher = searcher ? searcher : userId;
  const posts = await Model.Post.findAll({
    raw: true,
    where: { userId },
  });

  for (let i = 0; i < posts.length; i++) {
    const lbu = await this.hasLiked(searcher, posts[i].id);
    posts[i].likedByUser = lbu ? true : false;
  }
  return posts;
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

module.exports.hasLiked = async (userId, postId) => {
  return Model.PostLike.findOne({
    where: {
      userId,
      postId,
    },
  });
};

module.exports.like = async (data, likes) => {
  await Model.PostLike.create(data);
  await Model.Post.update({ likes }, {
    where: { id: data.postId },
  });
};

module.exports.unlike = async (data, likes, id) => {
  await Model.PostLike.destroy({
    where: data,
  });
  await Model.Post.update({ likes }, {
    where: { id },
  });
};

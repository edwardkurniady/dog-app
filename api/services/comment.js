const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.find = async (id, userId) => {
  const comment = await Model.Comment.findOne({
    raw: true,
    where: { id },
  });
  const lbu = await this.hasLiked(userId, id);
  if (comment) comment.likedByUser = lbu ? true : false

  return comment;
};

module.exports.getList = async (postId, searcher) => {
  const comments = await Model.Comment.findAll({
    raw: true,
    where: { postId },
  });

  for (let i = 0; i < comments.length; i++) {
    const lbu = await this.hasLiked(searcher, comments[i].id);
    comments[i].likedByUser = lbu ? true : false;
  }
  return comments;
};

module.exports.get = async (userId, searcher) => {
  searcher = searcher ? searcher : userId;
  const comments = await Model.Comment.findAll({
    raw: true,
    where: { userId },
  });

  for (let i = 0; i < comments.length; i++) {
    const lbu = await this.hasLiked(searcher, comments[i].id);
    comments[i].likedByUser = lbu ? true : false;
  }
  return comments;
};

module.exports.upload = async (data) => {
  await Model.Comment.create(data);
};

module.exports.update = async (data) => {
  await Model.Comment.update(data, {
    where: { id: data.id },
  });
};

module.exports.delete = async (id) => {
  await Model.Comment.destroy({
    where: { id },
  });
};

module.exports.hasLiked = async (userId, commentId) => {
  return Model.CommentLike.findOne({
    where: {
      userId,
      commentId,
    },
  });
};

module.exports.like = async (data, likes) => {
  await Model.CommentLike.create(data);
  await Model.Comment.update({ likes }, {
    where: { id: data.commentId },
  });
};

module.exports.unlike = async (data, likes, id) => {
  await Model.CommentLike.destroy({
    where: data,
  });
  await Model.Comment.update({ likes }, {
    where: { id },
  });
};

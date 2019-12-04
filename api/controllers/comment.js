const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const {
  post,
  comment,
} = require(`${root}/api/services`);

module.exports.get = async (req, h, session) => {
  return comment.get(req.params.user || session.user.id);
};

module.exports.getList = async (req, h) => {
  return comment.get(req.params.post);
};

module.exports.find = async (req, h) => {
  return comment.find(req.params.comment);
};

module.exports.upload = async (req, h, session) => {
  req.payload.likes = 0;
  req.payload.userId = session.user.id;

  const p = await post.find(req.payload.postId);

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  await comment.upload(req.payload);
  
  return constants['200'];
};

module.exports.update = async (req, h, session) => {
  const c = await comment.find(req.payload.id);

  if (!c) return {
    ...constants['404'],
    message: 'Comment not found!',
  };

  if (c.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await comment.update(req.payload);

  return constants['200'];
};

module.exports.delete = async (req, h, session) => {
  const c = await comment.find(req.payload.id);

  if (!c) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  if (c.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await comment.delete(req.payload.id);

  return constants['200'];
};

module.exports.like = async (req, h, session) => {
  const data = {
    userId: session.user.id,
    commentId: req.payload.id,
  };

  const c = await comment.find(req.payload.id);
  if (!c) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  const hasLiked = await comment.hasLiked(data);

  if (!hasLiked) await comment.like(data, c.likes + 1);
  else await comment.unlike(hasLiked, c.likes - 1, c.id);
  
  return constants['200'];
};

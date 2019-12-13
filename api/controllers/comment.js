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

module.exports.getList = async (req, h, session) => {
  const p = await post.find(req.params.post, session.user.id);
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };
  return comment.getList(req.params.post, session.user.id);
};

module.exports.find = async (req, h, session) => {
  const c = await comment.find(req.params.comment, session.user.id);
  if (!c) return {
    ...constants['404'],
    message: 'Comment not found!',
  };
  return c;
};

module.exports.upload = async (req, h, session) => {
  req.payload.likes = 0;
  req.payload.userId = session.user.id;

  const p = await post.find(req.payload.postId, session.user.id);
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  await comment.upload(req.payload);
  
  return {
    ...constants['200'],
    body: await comment.getList(req.payload.postId, session.user.id),
  };
};

module.exports.update = async (req, h, session) => {
  const c = await comment.find(req.payload.id, session.user.id);

  if (!c) return {
    ...constants['404'],
    message: 'Comment not found!',
  };

  if (c.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await comment.update(req.payload);

  return {
    ...constants['200'],
    body: await comment.find(req.payload.id, session.user.id),
  };
};

module.exports.delete = async (req, h, session) => {
  const c = await comment.find(req.payload.id, session.user.id);

  if (!c) return {
    ...constants['404'],
    message: 'Comment not found!',
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

  const c = await comment.find(data.commentId, data.userId);
  if (!c) return {
    ...constants['404'],
    message: 'Comment not found!',
  };

  if (!c.likedByUser) await comment.like(data, c.likes + 1);
  else await comment.unlike(data, c.likes - 1, c.id);
  
  return {
    ...constants['200'],
    body: await comment.find(data.commentId, data.userId),
  };
};

const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const {
  post,
} = require(`${root}/api/services`);

module.exports.get = async (req, h, session) => {
  return post.get(req.params.user || session.user.id);
};

module.exports.find = async (req, h) => {
  return post.find(req.params.post);
};

module.exports.upload = async (req, h, session) => {
  req.payload.likes = 0;
  req.payload.userId = session.user.id;

  await post.upload(req.payload);
  
  return constants['200'];
};

module.exports.update = async (req, h, session) => {
  const p = await post.find(req.payload.id);

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  if (p.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await post.update(req.payload);

  return constants['200'];
};

module.exports.delete = async (req, h, session) => {
  const p = await post.find(req.payload.id);

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  if (p.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await post.delete(req.payload.id);

  return constants['200'];
};

module.exports.like = async (req, h, session) => {
  const data = {
    userId: session.user.id,
    postId: req.payload.id,
  };

  const p = await post.find(req.payload.id);
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  const hasLiked = await post.hasLiked(data);

  if (!hasLiked) await post.like(data, p.likes + 1);
  else await post.unlike(hasLiked, p.likes - 1, p.id);
  
  return constants['200'];
};

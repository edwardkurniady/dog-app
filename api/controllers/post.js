const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const {
  post,
} = require(`${root}/api/services`);

module.exports.get = async (req, h, session) => {
  return post.get(req.params.user || session.user.id);
};

module.exports.find = async (req, h, session) => {
  const p = await post.find(req.params.post, session.user.id);
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };
  return p;
};

module.exports.upload = async (req, h, session) => {
  req.payload.likes = 0;
  req.payload.userId = session.user.id;

  await post.upload(req.payload);
  
  return {
    ...constants['200'],
    body: await post.get(req.payload.userId),
  };
};

module.exports.update = async (req, h, session) => {
  const p = await post.find(req.payload.id, session.user.id);
  console.log(req.payload.id)

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  if (p.userId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await post.update(req.payload);

  return {
    ...constants['200'],
    body: await post.find(req.payload.id, session.user.id),
  };
};

module.exports.delete = async (req, h, session) => {
  const p = await post.find(req.payload.id, session.user.id);

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

  const p = await post.find(data.postId, data.userId);
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  if (!p.likedByUser) await post.like(data, p.likes + 1);
  else await post.unlike(data, p.likes - 1, p.id);
  
  return {
    ...constants['200'],
    body: await post.find(data.postId, data.userId),
  };
};

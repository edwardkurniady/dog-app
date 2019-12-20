const path = require('path');
const root = path.resolve('.');
const comment = require('./comment');
const constants = require(`${root}/const`);
const { filter } = require(`${root}/utils`);
const { database } = require(`${root}/api/services`);

const sort = {
  order: [
    ['id', 'DESC'],
    ['name', 'ASC'],
  ],
};

async function getLikeStatus (posts, userId) {
  const isArray = Array.isArray(posts);
  posts = isArray ? posts : [ posts ];

  const result = await Promise.all(posts.map(async (post) => {
    const lbu = await database.findOne('PostLike', {
      userId,
      postId: post.id,
    });
    post.likedByUser = lbu ? true : false;
    post.comments = (await comment.getList({
      params: { post: post.id },
      requester: userId,
    })).body;
    return post;
  }));

  return isArray ? result : result[0];
}

async function getUserData (posts) {
  const isArray = Array.isArray(posts);
  posts = isArray ? posts : [ posts ];

  return Promise.all(posts.map (async (post) => {
    const user = await database.findOne('User', {
      id: post.userId,
    });

    post.name = user.name;
    post.photo = user.photo;
    delete post.updatedAt;
    delete post.userId;
    delete post.likes;

    return post;
  }));
}

module.exports.get = async (req, _) => {
  const searcher = req.requester;
  const userId = req.params.user || searcher;

  const posts = await database.findAll('Post', { userId }, sort);

  return {
    ...constants['200'],
    // body: await getLikeStatus(posts, searcher),
    body: await getUserData(posts),
  };
};

module.exports.global = async (req, _) => {
  const searcher = req.requester;
  req.query.limit = req.query.limit || 10;

  const posts = await database.findAll('Post', {}, {
    ...sort,
    ...req.query,
  });

  return {
    ...constants['200'],
    // body: await getLikeStatus(posts, searcher),
    body: await getUserData(posts),
  };
};

module.exports.find = async (req, _) => {
  const p = await database.findOne('Post', {
    id: req.params.post,
  });
  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };
  return {
    ...constants['200'],
    // body: await getLikeStatus(p, req.requester),
    body: await getUserData(p),
  };
};

module.exports.upload = async (req, _) => {
  req.payload.likes = 0;
  req.payload.userId = req.requester;

  await database.create('Post', req.payload);

  // return this.get(req);
  return {
    ...constants['200'],
    body: null,
  };
};

module.exports.update = async (req, _) => {
  const where = { id: req.payload.id };
  const p = await database.findOne('Post', where);

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };
  if (p.userId !== req.requester) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  filter(req.payload);
  await database.update('Post', req.payload, where);

  return this.get(req);
};

module.exports.delete = async (req, _) => {
  const where = { id: req.payload.id };
  const p = await database.findOne('Post', where);

  if (!p) return {
    ...constants['404'],
    message: 'Post not found!',
  };
  if (p.userId !== req.requester) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await database.delete('Post', where);

  return this.get(req);
};

module.exports.like = async (req, _) => {
  const data = {
    userId: req.requester,
    postId: req.payload.id,
  };

  const where = { id: data.postId };
  const post = await database.findOne('Post', where);
  if (!post) return {
    ...constants['404'],
    message: 'Post not found!',
  };

  const p = await getLikeStatus(post, data.userId);
  const likes = p.likedByUser ? p.likes - 1 : p.likes + 1;
  const method = p.likedByUser ? 'delete' : 'create';

  await database[method]('PostLike', data);
  await database.update('Post', { likes }, where);
  
  return this.get(req);
};

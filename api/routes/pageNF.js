module.exports = [
  {
    method: '*',
    path: '/{p*}',
    config: {
      auth: false,
      handler: (req, h) => {
        return h.response('The page was not found').code(404);
      },
    },
  },
];

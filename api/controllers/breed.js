const path = require('path');
const Model = require(path.resolve('.', 'models'));
const Bounce = require('bounce');

module.exports.getList = async (req, h) => {
  try {
    return Model.Breed.findAll({
      attributes: {
        exclude:[
          'createdAt',
          'updatedAt',
        ],
      },
    });
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

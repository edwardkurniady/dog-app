const path = require('path');
const Model = require(path.resolve('.', 'models'));
const Bounce = require('bounce');

module.exports.getList = async (req, h) => {
  try {
    return (await Model.Breed.findAll({
      attributes: {
        exclude:[
          'id',
          'createdAt',
          'updatedAt',
        ],
      },
    })).map(breed => breed.name);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

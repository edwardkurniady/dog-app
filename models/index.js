'use strict';

const {
  dotenv,
  fs,
  path,
  Sequelize,
} = require('../headers');

const basename = path.basename(__filename);
const env = dotenv.parsed.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && 
      (file !== basename) && 
      (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (!db[modelName].associate) return;
  db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

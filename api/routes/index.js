const {
  fs,
  path,
} = require('../../headers');

const basename = path.basename(module.filename);

const routes = [];

fs.readdirSync(__dirname)
  .filter((file) => 
    file.indexOf('.') !== 0
    && file !== basename
    && file.slice(-3) === '.js')
  .forEach((file) => {
    const name = file.slice(0, -3);
    routes.push(...require(`./${name}`));
  });

module.exports = routes;

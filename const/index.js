const {
  fs,
  path,
} = require('../headers');

const basename = path.basename(module.filename);
const constant = {};

fs.readdirSync(__dirname)
  .filter((file) => 
    file.indexOf('.') !== 0 && 
    file !== basename &&
    file.slice(file.indexOf('.') + 1) === 'xml'
    )
  .forEach((file) => {
      const name = file.slice(0, file.indexOf('.'));
      constant[name] = fs.readFileSync(`./const/${name}.xml`).toString();
  });

module.exports = constant;

const fs = require('fs');
const path = require('path');
const root = path.resolve('.');
const Bounce = require('bounce');
const constants = require(`${root}/const`);
const { auth } = require(`${root}/utils`);
const Joi = require('joi').extend(require('joi-date-extensions'));

const basename = path.basename(module.filename);

const routes = [];
const noAuth = {
  user: [
    'login',
    'register',
  ],
  breed: [
    'breed',
  ],
};

fs.readdirSync(__dirname)
  .filter((file) => 
    file.indexOf('.') !== 0
    && file !== basename
    && file.slice(-3) === '.js')
  .forEach((file) => {
    const name = file.slice(0, -3);
    routes.push(...require(`./${name}`).map(route => {
      const fn = route.config.handler;
      route.config.handler = async (req, h) => {
        try {
          let needAuth = true;
          (noAuth[name] || []).forEach(na => {
            if (route.path.indexOf(na) > -1) needAuth = false;
          });
          const session = auth.verify(req.payload.session);
          if (needAuth && session.error) return {
            ...constants['401'],
            message: session.error,
          };

          const result = await fn(req, h, session);
          const resp = Array.isArray(result) ? { result } : result;
          
          if (needAuth && result.statusCode !== 403) resp.session = auth.refresh(session);
          
          return resp;
        } catch(e) {
          console.error(e);
          Bounce.rethrow(e, 'boom');
          Bounce.rethrow(e, 'system');
        }
      }
      return route;
    }));
  });

module.exports = routes;

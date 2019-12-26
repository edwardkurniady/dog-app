// const base = 'firebase';
// const controller = require('../controllers')[base];

// module.exports = [
//   {
//     method: 'POST',
//     path: `/${base}/notification`,
//     config: {
//       handler: controller.login,
//       validate: {
//         payload: {
//           password: Joi.string().required(),
//           phoneNumber: Joi.string().required(),
//           token: Joi.string().allow(''),
//         },
//       },
//     },
//   },
// ];
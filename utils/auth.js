const jwt = require('jsonwebtoken');

module.exports = (session) => {
  try {
    return {
      decoded: jwt.verify(session, process.env.JWT_KEY),
    };
  } catch(e) {
    if (e.name === 'TokenExpiredError') return 'Login Session Expired!';
    if (e.message.indexOf('provided') > -1) return 'Please login first!';
    throw e;
  }
};
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
/*
module.exports = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(cookies.jwt, 'secret-key');
  } catch {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
*/
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

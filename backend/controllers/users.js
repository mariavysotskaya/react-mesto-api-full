const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const DataError = require('../errors/data-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const options = { new: true, runValidators: true };

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({
              email, password: hash, name, about, avatar,
            })
              .then((data) => res.status(201).send({
                _id: data._id,
                email: data.email,
                name: data.name,
                about: data.about,
                avatar: data.avatar,
              }))
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  next(new DataError('Переданы невалидные значения'));
                  return;
                }
                next(err);
              });
          })
          .catch(next);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь не зарегистрирован');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильный пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret-key',
            { expiresIn: '7d' },
          );
          res.send({ _id: user._id, token, message: 'Авторизация успешна' });
        })
        .catch(next);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ user });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Указан невалидный _id'));
        return;
      }
      next(err);
    });
};

const getUsers = (_req, res, next) => {
  User.find()
    .then((data) => res.send(data))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы невалидные значения'));
        return;
      }
      if (err.name === 'CastError') {
        next(new DataError('Передан некорректный _id'));
        return;
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы невалидные значения'));
        return;
      }
      if (err.name === 'CastError') {
        next(new DataError('Передан некорректный _id'));
        return;
      }
      next(err);
    });
};

module.exports = {
  login, getUsers, getUser, getCurrentUser, createUser, updateUser, updateAvatar,
};

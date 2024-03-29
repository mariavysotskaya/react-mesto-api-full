const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const PORT = 3000;
const { userSchemaValidation, userCredentialsSchemaValidation } = require('./middlewares/req-validation');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const errHandler = require('./middlewares/err-handle');

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://mymesto.nomoredomains.xyz',
    'http://mymesto.nomoredomains.xyz',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://127.0.0.1:27017/');
} else {
  mongoose.connect('mongodb://localhost:27017/mestodb');
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
}

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate(userSchemaValidation), createUser);
app.post('/signin', celebrate(userCredentialsSchemaValidation), login);

app.use(require('./middlewares/auth'));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(errHandler);

app.listen(PORT);

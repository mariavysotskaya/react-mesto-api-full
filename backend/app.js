const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3000;
const { userSchemaValidation, userCredentialsSchemaValidation } = require('./middlewares/req-validation');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');
const errHandler = require('./middlewares/err-handle');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signup', celebrate(userSchemaValidation), createUser);
app.post('/signin', celebrate(userCredentialsSchemaValidation), login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(errHandler);

app.listen(PORT);

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const { db } = process.env;
mongoose.connect(db);

const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { login, postUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 100,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regexTel = /^((\+7|7|8)+([0-9]){10})$/i;
const { getMK } = require('./controllers/mk');
const { postLid } = require('./controllers/lid');
const { postCertificate } = require('./controllers/certificate');
const { getMonth } = require('./controllers/month');

app.use('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.get('/schedule', getMK);
app.post('/lid', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    service: Joi.string().required(),
    tel: Joi.string().required().pattern(regexTel),
    MK: Joi.string().required(),
    amount: Joi.string().required(),
    comment: Joi.string(),
    dateFromCustomer: Joi.string().required(),
  }),
}), postLid);
app.post('/certificate', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    tel: Joi.string().required().pattern(regexTel),
    email: Joi.string().pattern(regexEmail),
    price: Joi.number().required(),
    owner: Joi.string().required(),
    type: Joi.string().required(),
  }),
}), postCertificate);
app.get('/month', getMonth);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexEmail),
    password: Joi.string().required().min(5).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), postUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexEmail),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/', require('./routes/index'));

app.all((req, res, next) => next(new NotFoundError('Страница не найдена.')));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res) => {
  const DEFAULT_ERROR = 500;
  const { statusCode } = err;
  const MSG_DEFAULT = 'Ошибка сервера';
  const message = statusCode === DEFAULT_ERROR ? MSG_DEFAULT : err.message;
  res.status(statusCode).send({ message });
});
app.listen(3001, () => {
  console.log('App listening on port 3000');
});

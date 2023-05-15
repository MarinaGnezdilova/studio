const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  postMK,
  deleteMK,
  patchMK,
} = require('../controllers/mk');

const {
  patchUserProfile,
  getUserInfo,
  deleteUser,
  /*postUser,*/
} = require('../controllers/user');

const {
  getLid,
  patchLid,
  deleteLid,
} = require('../controllers/lid');

const {
  getCertificate,
  patchCertificate,
  deleteCertificate,
} = require('../controllers/certificate');

const {
  postMonth,
  patchMonth,
} = require('../controllers/month');

const regex = /^https?:\/\/[a-z0-9~_\-\.]+\.[a-z]{2,9}([a-z0-9\[\]\#\-\.\_\~\/\?\@\!\$\&\'\(\)\*\+\,\;\:\=]*)?$/i;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

/*router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexEmail),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), postUser);*/
router.post('/schedule', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    shortTitle: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.number().required(),
    image: Joi.string().required().pattern(regex),
    date: Joi.string().required(),
  }),
}), postMK);
router.delete('/schedule/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteMK);
router.get('/users', getUserInfo);
router.patch('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(regexEmail),
  }),
}), patchUserProfile);
router.delete('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteUser);

router.get('/lid', getLid);
router.patch('/lid/:id', celebrate({
  body: Joi.object().keys({
    status: Joi.string().required(),
  }),
}), patchLid);
router.delete('/lid/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteLid);
router.get('/certificate', getCertificate);
router.patch('/certificate/:id', celebrate({
  body: Joi.object().keys({
    status: Joi.string().required(),
  }),
}), patchCertificate);
router.delete('/certificate/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteCertificate);

router.patch('/mk/:id', celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    shortTitle: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    duration: Joi.number(),
    date: Joi.string(),
    image: Joi.string(),
  }),
}), patchMK);

router.post('/month', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}), postMonth);
router.patch('/month/:id', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
  }),
}), patchMonth);

module.exports = router;

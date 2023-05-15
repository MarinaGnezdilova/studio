const Certificate = require('../models/certificate');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getCertificate = (req, res, next) => {
  Certificate.find({})
    .sort({ createdAt: -1 })
    .then((certificates) => res.send({ certificates }))
    .catch((e) => {
      next(e);
    });
};

module.exports.postCertificate = (req, res, next) => {
  Certificate.create({
    name: req.body.name,
    tel: req.body.tel,
    email: req.body.email,
    price: req.body.price,
    owner: req.body.owner,
    type: req.body.type,
  })
    .then((certificate) => res.status(CREATED).send({ certificate }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные для создании сертификата.'),
        );
      } else {
        next(e);
      }
    });
};

module.exports.patchCertificate = (req, res, next) => {
  Certificate.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((certificate) => res.send({ data: certificate }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления сертификата.'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления сертификата.'));
      } else {
        next(e);
      }
    });
};

module.exports.deleteCertificate = (req, res, next) => {
  Certificate.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Сертификат по указанному _id не найден.');
    })
    .then(() => { res.send('Удалено'); })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления сертификата.'),
        );
      } else {
        next(e);
      }
    });
};

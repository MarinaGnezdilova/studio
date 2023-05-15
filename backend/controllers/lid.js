const Lid = require('../models/lid');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');
const lid = require('../models/lid');

module.exports.getLid = (req, res, next) => {
  Lid.find({})
    .sort({ createdAt: -1 })
    .then((lids) => res.send({ lids }))
    .catch((e) => {
      next(e);
    });
};

module.exports.postLid = (req, res, next) => {
  Lid.create({
    name: req.body.name,
    service: req.body.service,
    tel: req.body.tel,
    MK: req.body.MK,
    amount: req.body.amount,
    comment: req.body.comment,
    dateFromCustomer: req.body.dateFromCustomer,
  })
    .then((lid) => res.status(CREATED).send({ data: lid }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные для создании заявки.'),
        );
      } else {
        next(e);
      }
    });
};

module.exports.patchLid = (req, res, next) => {
  Lid.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((lid) => res.send({ data: lid }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления заявки.'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления заявки.'));
      } else {
        next(e);
      }
    });
};

module.exports.deleteLid = (req, res, next) => {
  Lid.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Заявка по указанному _id не найдена.');
    })
    .then(() => { res.send('Удалено'); })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления заявки.'),
        );
      } else {
        next(e);
      }
    });
};


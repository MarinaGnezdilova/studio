const Month = require('../models/month');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');

module.exports.getMonth = (req, res, next) => {
  Month.find({})
    .sort({ createdAt: -1 })
    .then((month) => res.send({ month }))
    .catch((e) => {
      next(e);
    });
};

module.exports.postMonth = (req, res, next) => {
  Month.create({
    name: req.body.name,
  })
    .then((month) => res.status(CREATED).send({ data: month }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные для создании месяца.'),
        );
      } else {
        next(e);
      }
    });
};

module.exports.patchMonth = (req, res, next) => {
  Month.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Месяц по указанному _id не найден.');
    })
    .then((lid) => res.send({ data: lid }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления месяца.'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления месяца.'));
      } else {
        next(e);
      }
    });
};

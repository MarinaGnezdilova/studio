const MK = require('../models/mk');

const CREATED = 201;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getMK = (req, res, next) => {
  MK.find({})
    .sort({ createdAt: -1 })
    .then((mks) => res.send({ mks }))
    .catch((e) => {
      next(e);
    });
};

module.exports.postMK = (req, res, next) => {
  MK.create({
    title: req.body.title,
    shortTitle: req.body.shortTitle,
    description: req.body.description,
    price: req.body.price,
    duration: req.body.duration,
    date: req.body.date,
    image: req.body.image,
  })
    .then((mk) => res.status(CREATED).send({ data: mk }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные для создании мастер-класса.'),
        );
      } else {
        next(e);
      }
    });
};

module.exports.deleteMK = (req, res, next) => {
  MK.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Мастер-класс по указанному _id не найден.');
    })
    .then(() => { res.send('Удалено'); })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления мастер-класса.'),
        );
      } else {
        next(e);
      }
    });
};

module.exports.patchMK = (req, res, next) => {
  MK.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    shortTitle: req.body.shortTitle,
    description: req.body.description,
    price: req.body.price,
    duration: req.body.duration,
    date: req.body.date,
    image: req.body.image,
  }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Мастер-класс по указанному _id не найден.');
    })
    .then((mk) => res.send({ mk }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для обновления мастер-класса.'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные для обновления мастер-класса.'));
      } else {
        next(e);
      }
    });
};

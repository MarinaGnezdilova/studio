const mongoose = require('mongoose');

const regexTel = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i;

const lidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  service: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexTel.test(v),
      message: 'Поле "tel" должно быть телефоном.',
    },
  },
  MK: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateFromCustomer: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  amount: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    default: "Новая",
  },
});
module.exports = mongoose.model('lid', lidSchema);

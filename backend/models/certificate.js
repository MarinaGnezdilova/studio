const mongoose = require('mongoose');

const regexTel = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  tel: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexTel.test(v),
      message: 'Поле "tel" должно быть почтой.',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexEmail.test(v),
      message: 'Поле "email" должно быть почтой.',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Новый"
  },
});
module.exports = mongoose.model('certificate', certificateSchema);

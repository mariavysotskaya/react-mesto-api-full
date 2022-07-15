const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно'],
    minlength: [2, 'Значение должно быть больше 2 символов'],
    maxlength: [30, 'Значение должно быть меньше 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно'],
    validate: {
      validator: (value) => (validator.isURL(value, { require_protocol: true })),
      message: 'Ссылка указана некорректно',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: [true, 'Поле обязательно'],
  },
  likes: {
    type: [mongoose.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

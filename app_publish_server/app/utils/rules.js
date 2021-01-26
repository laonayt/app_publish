'use strict';

const Rules = {
  login: {
    name: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 6,
    },
    password: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 6,
    },
  },

  register: {
    name: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 6,
    },
    password: {
      type: 'string',
      required: true,
      allowEmpty: false,
      min: 6,
    },
    email: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  },
};

module.exports = Rules;
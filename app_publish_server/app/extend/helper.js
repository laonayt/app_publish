'use strict';

const Rules = require('../utils/rules');

module.exports = {
  success(data) {
    this.ctx.body = {
      code: 0,
      msg: 'success',
      data,
    };
  },

  err(err) {
    this.ctx.body = {
      code: -1,
      msg: 'failure',
      data: err,
    };
  },

  validate(type, data) {
    try {
      const rule = Rules(type);
      this.ctx.validate(rule, data);
    } catch (err) {
      this.ctx.body = {
        code: -1,
        msg: err,
      };
    }
  },
};

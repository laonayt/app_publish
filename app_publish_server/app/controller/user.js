'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = 'hi info';
  }
}

module.exports = UserController;

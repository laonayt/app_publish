'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = this.config.baseUrl;
  }
}

module.exports = HomeController;

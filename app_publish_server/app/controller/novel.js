'use strict';

const Controller = require('egg').Controller;
const { biqugeSearch } = require('../crawel/novel');

class NovelController extends Controller {
  async search() {
    const { ctx } = this;
    const dataList = await biqugeSearch(ctx, ctx.query);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: dataList,
    };
  }
}

module.exports = NovelController;

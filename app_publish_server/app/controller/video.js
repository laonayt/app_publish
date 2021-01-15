'use strict';

const Controller = require('egg').Controller;
const { searchZiyuan } = require('../crawel/video');

class VideoController extends Controller {
  // search
  async search() {
    const { ctx } = this;
    const dataList = await searchZiyuan(ctx, ctx.query);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: dataList,
    };
  }
}

module.exports = VideoController;

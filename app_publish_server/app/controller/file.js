'use strict';

const Controller = require('egg').Controller;
const AppInfoParser = require('app-info-parser');
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');

class FileController extends Controller {

  // 上传
  async upload() {
    const { ctx, service } = this;
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    const filename = encodeURIComponent(ctx.request.body.name) + path.extname(file.filename).toLowerCase();
    const targetPath = path.join(this.config.baseDir, 'app/public', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
    const downloadUrl = path.join(this.config.baseDir, 'app/public/', filename);

    // 解析包
    const parser = new AppInfoParser(downloadUrl);
    if (!parser) {
      ctx.body = {
        code: -1,
        msg: '包不存在',
        data: null,
      };
    }

    const parseResult = await parser.parse();
    console.log('parseResult ----> ', parseResult);

    const appResult = await service.file.createApp(parseResult);

    ctx.body = {
      code: 0,
      msg: 'success',
      data: appResult,
      appId: appResult._id,
    };

  }

  // 列表
  async list() {
    const { ctx, service } = this;
    const dataList = await service.file.listApp();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: dataList,
    };
  }
}

module.exports = FileController;

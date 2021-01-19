'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
const mustache = require('mustache');// 模板引擎
const pump = require('mz-modules/pump');// 上传需要

class AppController extends Controller {

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

    const parseResult = await service.app.parseAppInfo(downloadUrl);
    const appResult = await service.app.saveApp(parseResult);
    const versionResult = await service.app.saveVersion(appResult.id, parseResult);

    ctx.body = {
      code: 0,
      msg: 'success',
      data: versionResult,
    };

  }

  // app列表
  async appList() {
    const { ctx, service } = this;
    const dataList = await service.app.listApps();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: dataList,
    };
  }

  // version列表
  async versionList() {
    const { ctx, service } = this;
    const { appId } = ctx.query;
    const dataList = await service.app.listAppVersions(appId);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: dataList,
    };
  }

  // iOS plist 文件
  async plist() {
    const { ctx, service } = this;
    const { versionId } = ctx.query;
    const app = await service.app.appOfVersion(versionId);
    if (!app) {
      ctx.body = {
        code: -1,
        msg: 'err',
        data: '未找到该版本的app',
      };
    }
    console.log('appInfo:', versionId);

    const plistPath = path.join(__dirname, '../templates/template.plist');
    const plistTemplate = fs.readFileSync(plistPath).toString();
    const rendered = mustache.render(plistTemplate, {
      appName: app.appName,
      bundleID: app.packageId,
      versionStr: app.appVersion,
      downloadUrl: '',
      fileSize: '',
      iconUrl: '',
    });

    ctx.set('Content-Type', 'text/xml; charset=utf-8');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = rendered;
  }

  // 检查版本更新
  async checkUpdate() {
    const { ctx, service } = this;
    const { packageId, appVersion, platform } = ctx.query;
    const app = ctx.model.app.findOne(packageId);
    if (!app) {
      ctx.body = {
        code: -1,
        msg: 'err',
        data: '应用不存在',
      };
    }
    const version = ctx.model.version.find(packageId)
  }

}

module.exports = AppController;

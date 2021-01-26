'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
const mustache = require('mustache');// 模板引擎
const pump = require('mz-modules/pump');// 上传需要
class AppController extends Controller {

  /**
   * 上传
   */
  async upload() {
    const tempPath = path.join(this.config.baseDir, 'temp');
    const uploadPath = path.join(this.config.baseDir, 'upload');
    if (!fs.existsSync(tempPath) || !fs.existsSync(uploadPath)) {
      fs.mkdirSync(tempPath);
      fs.mkdirSync(uploadPath);
    }

    const { ctx, service } = this;
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    // 1 接收文件到临时目录
    const tempFilePath = path.join(tempPath, file.filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(tempFilePath);
    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, tempFilePath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    // 2 解析
    const parseResult = await service.app.parseAppInfo(tempFilePath);

    // 3 构造字段 (platform、installUrl、size、shortUrl)
    if (parseResult.CFBundleDisplayName) {
      parseResult.platform = 'iOS';
    } else {
      parseResult.platform = 'Android';
    }
    parseResult.shortUrl = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    parseResult.size = fs.statSync(tempFilePath).size;

    const downloadUrl = path.join(this.config.baseUrl, 'upload', parseResult.platform, file.filename);
    let installUrl = '';
    if (parseResult.platform === 'iOS') {
      const prefix = 'itms-services://?action=download-manifest&url=';
      installUrl = prefix + downloadUrl;
    } else {
      installUrl = downloadUrl;
    }
    parseResult.installUrl = installUrl;

    // 4 从临时目录复制文件到对应下载目录
    const storePath = path.join(uploadPath, parseResult.platform);
    if (!fs.existsSync(storePath)) {
      fs.mkdirSync(storePath);
    }

    const fileFinalPath = path.join(storePath, file.filename);
    fs.copyFile(tempFilePath, fileFinalPath, err => {
      if (err) {
        console.log('移动文件失败');
      } else {
        console.log('移动文件成功');
      }
    });

    // 5 插入数据库
    const appResult = await service.app.saveApp(parseResult);
    const versionResult = await service.version.saveVersion(appResult.id, parseResult);

    ctx.helper.success(versionResult);
  }

  /**
   * app发布
   */
  async appPublish() {
    const { ctx } = this;
    // const {installWithPwd, installPwd} = ctx.query;
    ctx.helper.success('app publish ok');
  }

  /**
   * app列表
   */
  async appList() {
    const { ctx, service } = this;
    const dataList = await service.app.listApps();
    ctx.helper.success(dataList);
  }

  /**
   * version列表
   */
  async versionList() {
    const { ctx, service } = this;
    const { appId } = ctx.query;
    const dataList = await service.version.versionList(appId);
    ctx.helper.success(dataList);
  }

  /**
   * 删除app
   */
  async deleteApp() {
    const { ctx, service } = this;
    const { appId } = ctx.query;
    const dataList = await service.app.deleteApp(appId);
    ctx.helper.success(dataList);
  }

  /**
   * 删除 version
   */
  async deleteVersion() {
    const { ctx, service } = this;
    const { appId } = ctx.query;
    const dataList = await service.version.deleteVersion(appId);
    ctx.helper.success(dataList);
  }

  /**
   * iOS plist 文件
   */
  async plist() {
    const { ctx, service } = this;
    const { versionId } = ctx.query;
    const app = await service.app.appOfVersion(versionId);
    if (!app) {
      ctx.helper.err('未找到该版本的app');
    }
    console.log('appInfo:', versionId);
    const plistPath = path.join(__dirname, '../templates/template.plist');
    const plistTemplate = fs.readFileSync(plistPath).toString();
    // 渲染模板
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

  /**
   * 检查版本更新
   */
  async checkUpdate() {
    const { ctx } = this;
    // const { packageId, appVersion, platform } = ctx.query;
    // const app = await ctx.model.app.findOne(packageId);
    // if (!app) {
    //   ctx.helper.err('应用不存在');
    // }
    // const version = ctx.model.version.find(packageId);
    ctx.helper.success('checkUpdate ok');
  }

}

module.exports = AppController;

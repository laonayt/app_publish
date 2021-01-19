'use strict';

const Service = require('egg').Service;
const AppInfoParser = require('app-info-parser');

class FileService extends Service {
  // 解析包
  async parseAppInfo(filePath) {
    const parser = new AppInfoParser(filePath);
    if (!parser) return '包不存在';
    const parseResult = await parser.parse();
    return parseResult;
  }

  // 添加一个app
  async saveApp(result) {
    const appVersion = result.versionName || result.CFBundleShortVersionString;
    const appIcon = result.icon;
    const packageId = result.package || result.CFBundleIdentifier;
    let platform;// = result.CFBundleDisplayName ? 'iOS' : 'Android';
    let appName;// = result.application.label || result.CFBundleDisplayName;
    if (result.CFBundleDisplayName) {
      platform = 'iOS';
      appName = result.CFBundleDisplayName;
    } else {
      platform = 'Android';
      appName = result.application.label[0];
    }

    const app = await this.ctx.model.App.findOne({ platform, packageId });
    if (!app) { // 不存在
      console.log('添加一个新app');
      const appModel = {
        appName,
        appVersion,
        appIcon,
        platform,
        packageId,
      };
      const appResult = await this.ctx.model.App.create(appModel);
      return appResult;
    }
    return app;
  }

  // 添加app的一个Version
  async saveVersion(appId, result) {
    const appVersion = result.versionName || result.CFBundleShortVersionString;
    const appIcon = result.icon;
    const packageId = result.package || result.CFBundleIdentifier;
    let platform;// = result.CFBundleDisplayName ? 'iOS' : 'Android';
    let appName;// = result.application.label || result.CFBundleDisplayName;
    if (result.CFBundleDisplayName) {
      platform = 'iOS';
      appName = result.CFBundleDisplayName;
    } else {
      platform = 'Android';
      appName = result.application.label[0];
    }

    const version = await this.ctx.model.Version.findOne({ appId, appVersion });
    if (!version) {
      console.log('添加一个新版本');
      const versionModel = {
        appName,
        appId,
        appVersion,
        appIcon,
        platform,
        packageId,
      };
      const versionResult = await this.ctx.model.Version.create(versionModel);
      return versionResult;
    }
    return version;
  }

  // 查询某个版本的 app
  async appOfVersion(versionId) {
    const findResult = await this.ctx.model.Version.findById(versionId);
    return findResult;
  }

  // 所有 app
  async listApps() {
    const findResult = await this.ctx.model.App.find();
    return findResult;
  }

  // 某个app 的所有版本
  async listAppVersions(appId) {
    const findResult = await this.ctx.model.Version.find({ appId });
    return findResult;
  }
}

module.exports = FileService;

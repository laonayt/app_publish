'use strict';

const Service = require('egg').Service;
const AppInfoParser = require('app-info-parser');

class AppService extends Service {
  // app解析
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
    const platform = result.platform;
    const appName = result.CFBundleDisplayName || result.application.label[0];

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

  // app列表
  async listApps() {
    const findResult = await this.ctx.model.App.find();
    return findResult;
  }

  // 删除app
  async deleteApp(appId) {
    const result = await this.ctx.model.App.deleteOne({ appId });
    return result;
  }
}

module.exports = AppService;

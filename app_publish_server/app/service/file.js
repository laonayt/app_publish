'use strict';

const Service = require('egg').Service;

class FileService extends Service {

  async exist(name) {
    const result = await this.ctx.model.File.findOne({ name });
    return result;
  }

  // 添加一个app
  async createApp(result) {
    const appName = result.package || result.CFBundleName;
    const appVersion = result.versionName || result.CFBundleShortVersionString;
    const appIcon = result.icon;

    const fileModel = {
      appName,
      appVersion,
      appIcon,
    };
    const createResult = await this.ctx.model.File.create(fileModel);
    return createResult;
  }

  // 添加一个Version
  // async createVersion(result) {
  //   const versionModel = {

  //   };

  // }

  // 列表 app
  async listApp() {
    const findResult = await this.ctx.model.File.find();
    return findResult;
  }
}

module.exports = FileService;

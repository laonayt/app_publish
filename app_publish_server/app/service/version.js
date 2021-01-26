'use strict';

const Service = require('egg').Service;

class VersionService extends Service {
  // 添加Version
  async saveVersion(appId, result) {
    const appVersion = result.versionName || result.CFBundleShortVersionString;
    const appIcon = result.icon;
    const packageId = result.package || result.CFBundleIdentifier;
    const platform = result.platform;
    const installUrl = result.installUrl;
    const appName = result.CFBundleDisplayName || result.application.label[0];

    const version = await this.ctx.model.Version.findOne({ appId, appVersion });
    if (!version) {
      console.log('添加一个新版本');
      const versionModel = {
        appName,
        appId,
        appVersion,
        appIcon,
        platform,
        installUrl,
        packageId,
      };
      const versionResult = await this.ctx.model.Version.create(versionModel);
      return versionResult;
    }
    return version;
  }

  // 版本列表
  async versionList(appId) {
    const findResult = await this.ctx.model.Version.find({ appId });
    return findResult;
  }

  // 版本详情
  async versionDetail(versionId) {
    const findResult = await this.ctx.model.Version.findById(versionId);
    return findResult;
  }

  // 删除Version
  async deleteVersion(appId) {
    const result = await this.ctx.model.Version.deleteOne({ appId });
    return result;
  }
}

module.exports = VersionService;

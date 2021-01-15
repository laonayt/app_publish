'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');// 模板引擎
// const Template = require('../templates/template.plist');

class AppController extends Controller {
  async plist() {
    // const plistPath = path.join(__dirname, '../templates/template.plist');
    // const plistTemplate = fs.readFileSync(plistPath).toString();
    // const rendered = mustache.render(plistTemplate, {
    //   appName: app.appName,
    //   bundleID: app.bundleId,
    //   versionStr: version.versionStr,
    //   downloadUrl: url,
    //   fileSize: version.size,
    //   iconUrl: `${config.baseUrl}/${app.icon}`,
    // });
    const { ctx } = this;
    const { appId, versionId } = ctx.query;
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { appId, versionId },
    };
  }
}

module.exports = AppController;

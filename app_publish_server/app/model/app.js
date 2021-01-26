'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    appName: { type: String, required: true }, // 包名
    appVersion: { type: String, required: true }, // 当前版本
    appIcon: { type: String, required: true }, // 图标
    platform: { type: String, required: true }, // 平台
    packageId: { type: String, required: true }, // 包id
    // shortUrl: { type: String, required: true }, // 安装短链
    // installWithPwd: { type: String }, // 是否密码安装
    // installPwd: { type: String }, // 安装密码
    // releaseVersionCode: { type: String }, // 最新版本
  });
  return mongoose.model('App', UserSchema);
};

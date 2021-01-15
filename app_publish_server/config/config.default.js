/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610591923158_5068';

  // add your middleware config here
  config.middleware = [];

  // 关闭csrf验证
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置端口号- 无效
  config.cluster = {
    listen: {
      path: '',
      port: 7777,
      hostname: '0.0.0.0',
    },
  };

  // 配置上传
  config.multipart = {
    mode: 'file', // file stream
    fileSize: '100mb',
    fileExtensions: [ '.apk', '.ipa' ], // 扩展几种上传的文件格式
    // tmpdir: '../uploads',
    // tmpdir: path.join(__dirname, '../tmp'),
    // tmpdir: path.join(os.tmpdir(), 'uploads', appInfo.name), // 存储路径
    cleanSchedule: {
      cron: '0 30 4 * * *',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      client: {
        url: 'mongodb://localhost:27017/app_publish',
        options: {},
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

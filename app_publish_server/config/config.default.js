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

  // jwt
  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: ['http://localhost:8080'], // 允许访问接口的白名单
  };

  // 配置端口号- 无效
  config.cluster = {
    listen: {
      path: '',
      port: 7777,
      hostname: '0.0.0.0',
    },
  };
  // 配置ip
  config.baseUrl = 'http://127.0.0.1';

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
    validate: {
      convert: true,
      // validateRoot: false,
    },
  };

  const weConfig = {
    allowRegister: true, // 是否允许用户注册
    salt: 'app_publish', // 密码加密盐值
  };

  return {
    ...config,
    ...userConfig,
    ...weConfig,
  };
};

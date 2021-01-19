'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/user/info', controller.user.info);// user
  router.post('/api/auth/login', controller.auth.login);// auth register
  router.post('/api/auth/register', controller.auth.register);// auth register

  router.post('/api/app/upload', controller.app.upload);// app upload
  router.get('/api/app/appList', controller.app.appList);// app list
  router.get('/api/app/versionList', controller.app.versionList);// app versions
  router.get('/api/app/plist', controller.app.plist);// ios plist

  router.get('/api/app/checkUpdate', controller.app.);
};

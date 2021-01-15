'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/user/info', controller.user.info);// user
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/register', controller.auth.register);// auth
  router.get('/api/novel/search', controller.novel.search);// novel
  router.get('/api/video/search', controller.video.search);// video
  router.post('/api/file/upload', controller.file.upload);// file upload
  router.get('/api/file/list', controller.file.list);// file list
  router.get('/api/app/plist', controller.app.plist);// ios plist
};

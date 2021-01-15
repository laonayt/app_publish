'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const { username, password } = data;
    if (username && password) {
      const result = await service.user.exist(username);

      if (!result) {
        ctx.body = {
          code: -1,
          msg: '用户名不存在',
          data: null,
        };
      } else {
        if (username === 'we' && password === '123456') {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            data: null,
          };
        } else {
          ctx.body = {
            code: -1,
            msg: '密码错误',
            data: null,
          };
        }
      }

    } else {
      ctx.body = {
        code: -1,
        msg: '参数不足',
      };
    }
  }

  async register() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const { username, password } = data;
    if (username && password) {
      const result = await service.user.exist(username);
      if (!result) {
        const model = {};
        model.username = username;
        model.password = password;

        const result = await service.user.create(model);
        ctx.body = {
          code: 0,
          msg: '注册成功',
          data: result,
        };
      } else {
        ctx.body = {
          code: -1,
          msg: '用户名已存在',
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '参数不足',
      };
    }
  }
}

module.exports = AuthController;

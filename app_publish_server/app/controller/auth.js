'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcrypt');
const Util = require('../utils/util');
// const jwt = require('jsonwebtoken');

class AuthController extends Controller {
  /**
   * 登录
   */
  async login() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const { username, password } = data;
    // 校验参数
    ctx.helper.validate('login', data);
    // 校验用户名
    const result = await service.user.exist(username);
    if (!result) {
      ctx.helper.err('user not exist');
      return;
    }

    // 校验密码
    const pwdValit = bcrypt.compareSync(password, result.password);
    if (!pwdValit) {
      ctx.helper.err('password wrong');
      return;
    }
    const token = Util.generateToken(result.username);
    ctx.helper.success({
      token,
      user: result,
    });
  }

  /**
   * 注册
   */
  async register() {
    const { ctx, service } = this;
    if (!ctx.app.config.allowRegister) {
      ctx.helper.err('new register is not allowed');
      return;
    }
    // 校验参数
    const data = ctx.request.body;
    ctx.helper.validate('register', data);

    const { username, password, email } = data;
    const result = await service.user.exist(username);
    if (!result) {
      const model = {};
      model.username = username;
      model.email = email;

      const newPwd = await bcrypt.hash(password, 10);
      model.password = newPwd;

      const result = await service.user.create(model);
      ctx.helper.success(result);
    } else {
      ctx.helper.err('username already exist');
    }
  }
}

module.exports = AuthController;

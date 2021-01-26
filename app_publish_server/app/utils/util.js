'use strict';

const Util = {
  /**
   * 生成 token
   * @param username
   */
  generateToken(username) {
    const { app } = this;
    const token = app.jwt.sign(
      { username }, // 需要存储的 token 数据
      { expiresIn: '60s' }, // 失效时间
      app.config.jwt.secret);
    return token;
  },
};

module.exports = Util;

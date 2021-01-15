'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async exist(username) {
    const result = await this.ctx.model.User.findOne({ username });
    return result;
  }

  async create(user) {
    const result = await this.ctx.model.User.create({ ...user });
    return result;
  }
}

module.exports = UserService;

'use strict';

module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    console.log('--------', token);
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log(decode);
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  };
};

'use strict';
const moment = require('moment');

module.exports = function(Item) {
  Item.beforeRemote('*', function(ctx, thing, next) {
    if (ctx.req.headers.authorization) {
      const token = ctx.req.headers.authorization.replace('Bearer ', '');
      const JWT = Item.app.models.jwt;
      JWT.findOne({where: {token}}, (err, user) => {
        if (err || !user) {
          next(new Error('Token not found'));
        } else {
          next();
        }
      });
    } else {
      next(new Error('You must be logged in'));
    }
  });
};

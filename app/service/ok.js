'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class OkService extends Service {
  async trade() {
    const timestamp = moment();
    console.log(timestamp);
    const callback = await this.ctx.curl('http://api.waditu.com', {
      method: 'POST',
      contentType: 'json',
      data: {
        api_name: 'stock_basic',
        token: '021aced2154517da19b6d76dca1f9fc02b8fdaa5aa1a8e43fee373fd',
      },
      dataType: 'json',
    });
    return callback;
  }
}
module.exports = OkService;

'use strict';
const Service = require('egg').Service;
// moment().utcOffset();
class OkService extends Service {
  async trade() {
    const timestamp = this.ctx.service.utils.getTime();
    const callback = await this.ctx.curl('http://okex.me/api/general/v3/time', {
      followRedirect: true,
      contentType: 'json',
      dataType: 'json',
    });
    console.log(callback.data.iso)
    // const callback = await this.ctx.curl('http://api.waditu.com', {
    //   method: 'POST',
    //   contentType: 'json',
    //   data: {
    //     api_name: 'stock_basic',
    //     token: '021aced2154517da19b6d76dca1f9fc02b8fdaa5aa1a8e43fee373fd',
    //   },
    //   dataType: 'json',
    // });
    return callback.data;
  }
}
module.exports = OkService;

'use strict';
const Service = require('./common');
// moment().utcOffset();
class OkService extends Service {
  async trade() {
    const callback = await this.request({
      url: `/api/general/v3/time`
    })
    console.log(callback.data.iso)
    return callback.data;
  }
}
module.exports = OkService;

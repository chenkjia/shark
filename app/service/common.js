'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const {SECURITYKEY,APIKEY,PASSPHRASE} = require('./key.js');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');
class CommonService extends Service {
  getTime() {
    return moment().utc().format();
  }
  async request({method = 'GET', url, data}) {
    const timestamp = this.getTime()
    const dataFormat = data ? JSON.stringify(data) : ''
    const signText = `${timestamp}${method}${url}${dataFormat}`
    console.log(dataFormat)
    console.log(signText)
    console.log(data)
    const sign = Base64.stringify(hmacSHA256( signText ,SECURITYKEY))
    const callback = await this.ctx.curl(`http://okex.me${url}`, {
      method,
      followRedirect: true,
      dataType: 'json',
      data,
      headers: {
        "Content-Type":"application/json",
        'OK-ACCESS-KEY': APIKEY,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': PASSPHRASE,
      }
    });
    console.log(callback)
    return callback
  }
}
module.exports = CommonService;

'use strict';
const Service = require('./common');
class OkSpotService extends Service {
  async accounts(currency) {
    console.log(currency)
    const callback = await this.request({
      url: `/api/spot/v3/accounts/${currency}`
    })
    return callback.data.available;
  }
  async trade(query) {
    return this.orders(query)
  }
  async orders({instrument_id, side}) {
    const currency = instrument_id.split('-')[side==='buy'?1:0]
    const notional = await this.accounts(currency.toLowerCase())
    if (notional) {
      const callback = await this.request({
        method: 'POST',
        url: '/api/spot/v3/orders',
        data: {
          instrument_id,
          side,
          'size': notional.toString(),
          'notional': notional.toString(),
          'type': 'market'
        }
      })
      return callback.data;
    }
    return notional
  }
}
module.exports = OkSpotService;

'use strict';

const Controller = require('egg').Controller;

class OiController extends Controller {
  constructor(x) {
    super(x);
    this.service = this.ctx.service;
  }
  async spotTrade() {
    const { ctx, service } = this;
    ctx.body = await service.spot.trade(ctx.request.body);
  }
  async spotAccounts() {
    const { ctx, service } = this;
    ctx.body = await service.spot.accounts();
  }
}

module.exports = OiController;

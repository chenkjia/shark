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
  async spotTest() {
    const { ctx, service, query } = this;
    ctx.logger.info('-----------------')
    ctx.logger.info('POST')
    ctx.logger.info('ctx')
    ctx.logger.info(ctx.req)
    ctx.body = ctx.req; 
  }
}

module.exports = OiController;

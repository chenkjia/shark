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
    ctx.logger.info('ctx.request.body')
    ctx.logger.info(ctx.request.body)
    ctx.logger.info('query')
    ctx.logger.info(query)
    ctx.body = ctx.request.body;
  }
}

module.exports = OiController;

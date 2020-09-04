'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(x) {
    super(x);
    this.service = this.ctx.service;
  }
  async index() {
    const { ctx, service } = this;
    ctx.body = await service.ok.trade();
  }
}

module.exports = HomeController;

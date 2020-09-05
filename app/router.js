'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/time', controller.home.time);
  router.post('/ok/spot/trade', controller.ok.spotTrade);
  router.post('/ok/spot/accounts', controller.ok.spotAccounts);
  router.post('/ok/spot/test', controller.ok.spotTest);
  
};

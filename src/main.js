import './libs/console.js';

import { alchemy } from './libs/provider.js';
import { ROUTER } from './constants/index.js'
import alchemyBot from './alchemyBot.js'

const main = () => {
  console.log('启动');
  alchemy.ws.on(
    {
      method: 'alchemy_pendingTransactions',
      toAddress: ROUTER.ROUTER_UNIVE,
    }, alchemyBot
  );
  alchemy.ws.on(
    {
      method: 'alchemy_pendingTransactions',
      toAddress: ROUTER.ROUTER_UNIV2,
    }, alchemyBot
  );
}
main();
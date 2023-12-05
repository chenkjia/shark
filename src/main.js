import './libs/console.js';

import { alchemy } from './libs/provider.js';
import { ROUTER } from './constants/index.js'
import bot from './bot/index.js'

const main = () => {
  console.log('启动');
  alchemy.ws.on(
    {
      method: 'alchemy_pendingTransactions',
      toAddress: ROUTER.ROUTER_UNIVE,
    }, bot
  );
}
main();
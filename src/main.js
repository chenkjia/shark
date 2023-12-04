import './libs/console.js';
import { ROUTER, FACTORY, ABI, INTERFACE } from './constants/index.js';
console.log({ ROUTER, FACTORY, ABI, INTERFACE })

// const main = () => {
//   console.log('启动');
//   alchemy.ws.on(
//     {
//       method: 'alchemy_pendingTransactions',
//       toAddress: CONTRACTS.UNIVE_ROUTER,
//     }, bot
//   );
// }
// main();
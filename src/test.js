import './libs/console.js';

import { alchemy } from './libs/provider.js';

import bot from './bot/index.js';

const test = ({hash}) => {
  alchemy.core
    .getTransaction('0x6cb65bc724961f7650e2d1530c63f510d86fbdab59e3f1a2e50cc292605e9db0')
    .then((tx) => {
      bot({
        ...tx,
        to: tx.to.toLowerCase()
      })
    });
  
  // const tx = txFormat(alData);
  // console.log(tx)
}
test({
  hash: '0x6cb65bc724961f7650e2d1530c63f510d86fbdab59e3f1a2e50cc292605e9db0'
});
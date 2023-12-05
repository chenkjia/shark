import './libs/console.js';

import { alchemy } from './libs/provider.js';

// const test = ({hash}) => {
alchemy.core
  .getTransaction('0x6cb65bc724961f7650e2d1530c63f510d86fbdab59e3f1a2e50cc292605e9db0')
  .then(console.log);
  // const tx = txFormat(alData);
  // console.log(tx)
// }
// test('0x3a3f849624b6a177273c400813b3a3419ce8a9fba8730d47eaeab8084204e9f0');
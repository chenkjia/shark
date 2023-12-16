import { INTERFACE } from '../constants/index.js'
import { ethers } from 'ethers';
import { simulateTransaction } from './ethCall.js';


const sendTransfer = async () => {
  // 访问合约方法
  const data = INTERFACE.INTERFACE_WETH.encodeFunctionData('withdraw',[ethers.utils.parseEther('0.6')]);
  // 组合发送的transaction
  const transaction = {
    from: '0x78C409d21Acb677622c1E3dDCcc8c4d8dF1Bc804',
    to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    gas: ethers.utils.hexValue(0),
    gasPrice: ethers.utils.hexValue(0),
    value: ethers.utils.hexValue(0),
    data,
  }
  // 设置区块高度
  const result = await simulateTransaction(
    transaction,
    18753607
  );
  console.log(result)
};
(async () => {
  sendTransfer();
})();
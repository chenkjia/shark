import axios from 'axios';
import { ENV,INTERFACE } from '../constants/index.js'
import { ethers } from 'ethers';

const approveDai = async () => {
  const { TENDERLY_WEB3_GATEWAY_KEY } = ENV;
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
  const blockHeight = ethers.utils.hexValue(18753607)
  // 发送模拟信息
  const resp = await axios.post(
    `https://mainnet.gateway.tenderly.co/${TENDERLY_WEB3_GATEWAY_KEY}`,
    {
      "id": 0,
      "jsonrpc": "2.0",
      "method": "tenderly_simulateTransaction",
      "params": [
        transaction,
        blockHeight
      ]
    }
  );
  console.timeEnd('Simulation');
  const result = resp.data.result;
  if(result) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.error(resp)
  }
};
 
approveDai();
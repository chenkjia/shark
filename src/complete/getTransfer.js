import { INTERFACE } from '../constants/index.js'
import { ethCall } from './ethCall.js';

const demoInterface =  INTERFACE.INTERFACE_POOL_UNIV2

// 访问的合约方法
const contractFunction = "getReserves"
// 生成访问合约的inputData
const data = demoInterface.encodeFunctionData(contractFunction);

const getReserves = async(contract, blockHeight) =>{
  // 获取数据
  const result = await ethCall({
    to: contract,
    data
  }, blockHeight)
  // 解析数据
  const decodeResult = demoInterface.decodeFunctionResult(contractFunction, result)
  console.log(decodeResult)
}
(async () => {
  getReserves('0x6033368e4a402605294c91CF5c03d72bd96E7D8D', 15000000);
})();
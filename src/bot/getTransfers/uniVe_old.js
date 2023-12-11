

import { ABI } from "../../constants/index.js"
import InputDataDecoder from 'ethereum-input-data-decoder';
const decoder = new InputDataDecoder(ABI.ABI_ROUTER_UNIVE)


const dataFormatter = {
  execute: (params) => {
    const mul = params[1].map((p,index) => {
      const command = "0x" + params[0][index * 2 + 2] + params[0][index * 2 + 3]
      const info = ABI_DEFINITION[command] && ethers.utils.defaultAbiCoder.decode(ABI_DEFINITION[command], p)
      const result = commandS[command] && commandS[command](info)
      return result
    });
    return mul.filter(i => i).reduce((r,i) => ([
      ...r,
      ...i
    ]), []);
  }
}

const dataFormat = (txData) => {
  const data = decoder.decodeData(txData)
  // return dataFormatter[data?.name]?.(data.params)
  if (data && dataFormatter[data.name]) {
    return dataFormatter[data.name](data.args);
  } else {
    return null;
  }
}

export default (tx) => {
  console.log('unive')
  const parsedData = decoder.decodeData(tx.data)
  // const parsedData = INTERFACE.INTERFACE_ROUTER_UNIVE.parseTransaction({ data: tx.data });
  console.log(parsedData)
  return 'aaa'
}

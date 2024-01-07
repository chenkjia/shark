
import { ethers } from 'ethers'
import getTx from '../src/cleanUp/getTx.js'
import decode from '../src/deconstruct/decode.js'
import transfersFormatter from "../src/deconstruct/transfersFormatter/index.js"
import { calculatePoolAddress } from '../src/libs/getPool.js'
import getReserves from '../src/complete/getReserves.js'
import calculateTransfer from '../src/calculate/calculateTransfer/index.js'
const getUniV2 = async (hash) => {
  const tx = await getTx(hash)
  const decodeData = decode('ROUTER_UNIVE', tx)
  const transfers = transfersFormatter('ROUTER_UNIVE', decodeData)
  const pairAddress = await calculatePoolAddress(transfers[0])
  // const resverse = await getReserves(item, pairAddress, 18880839)
  const resverse = await getReserves(transfers[0], pairAddress, tx.blockNumber - 1)
  const completeTransfer = {
    ...transfers[0],
    ...resverse,
    pairAddress
  }
  console.log('completeTransfer')
  console.log('amountIn:', ethers.utils.formatEther(completeTransfer.amountIn))
  console.log('amountOut:', ethers.utils.formatEther(completeTransfer.amountOut))
  const result = await calculateTransfer(completeTransfer)
  if(result && result.revenue) {
    console.log(result)
    console.log(ethers.utils.formatEther(result.revenue))
    console.log(ethers.utils.formatEther(result.frontrun.amountIn))
    console.log(ethers.utils.formatEther(result.frontrun.amountOut))
  }
  return result
}


(async () => {
  const result = await getUniV2('0x65bc8f1f5019215d6b71acb395f37cf4370f43e1e8b6b9cf62555909d8cbc1a0');
  console.log(result)
})();

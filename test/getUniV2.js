
import { ethers } from 'ethers'
import getTx from '../src/cleanUp/getTx.js'
import { ROUTER_LOW_INVERT } from "../src/constants/index.js"
import decode from '../src/deconstruct/decode.js'
import transfersFormatter from "../src/deconstruct/transfersFormatter/index.js"
import { calculatePoolAddress } from '../src/libs/getPool.js'
import getReserves from '../src/complete/getReserves.js'
import calculateTransfer from '../src/calculate/calculateTransfer/index.js'
const getUniV2 = async (hash) => {
  const tx = await getTx(hash)
  console.log(tx.to.toLowerCase())
  console.log(ROUTER_LOW_INVERT)
  const routerName = ROUTER_LOW_INVERT[tx.to.toLowerCase()]
  const decodeData = decode(routerName, tx)
  const transfers = transfersFormatter(routerName, decodeData)
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
  // const result = await getUniV2('0xf95dfbfa5d1f735294c1cc19117236985b73b6385eafbb7296e2571616193bdc');
  const result = await getUniV2('0xeacfb3c9fc68ddb909ac6f05c368ee6357c9d7c15a2581750aa8a2a413e0b71b');
  console.log(result)
})();

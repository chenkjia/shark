import {ENV} from '../src/constants/index.js'
import { wssGoerliProvider } from '../src/libs/provider.js'

import { Chain, Common, Hardfork } from '@ethereumjs/common'
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx'
import { bytesToHex } from '@ethereumjs/util'

const tx = await wssGoerliProvider.getTransaction("0x9dd8d5612e6f54c03db3a189e09df0505bffb75549ecf33953c8ddf8641a0b23");

const txData = {
  to: tx.to,
  data: tx.data,
  value: tx.value.toHexString(),
  nonce: tx.nonce,
  gasPrice: tx.gasPrice.toHexString(),
  gasLimit: tx.gasLimit.toHexString(),
  maxPriorityFeePerGas: tx.maxPriorityFeePerGas.toHexString(),
  maxFeePerGas: tx.maxFeePerGas.toHexString(),
  type: tx.type,
  chainId: tx.chainId,
}
const a = '0x02f87105808459682f008459682f0d8252089458f095aaaba4c6fe9f1e30ea62bad5a89c1c00b387038d7ea4c6800080c001a0c7476884377eec0a3cf58d34342ef93b7eae680cd7ed6e460f0e15923545cd78a0262da8154488a666984eafbd15e30e4c463fe99e14622e554359233606f62ccb'
const common = new Common({ chain: Chain.Goerli, hardfork: Hardfork.London })
const privateKey = Buffer.from(ENV.PRIVATE_KEY,'hex')
const txFormatter = (txData) => {
  const t = FeeMarketEIP1559Transaction.fromTxData(txData, { common })
  const tx = bytesToHex(t.sign(privateKey).serialize())
  return tx
}
const result = txFormatter(txData)
console.log(result)
console.log(a===result)
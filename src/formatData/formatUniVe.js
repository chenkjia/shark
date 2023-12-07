import { ethers } from 'ethers';
import { read } from '../libs/mongodbClient.js'
import { ABI_DEFINITION, commandS } from '../bot/getTransfers/uniVe.js'
const dbName = 'c';
let tmpTransfers = []

const formatUniVe = async () => {
  const commands = await read('c', 'commands', {
    command: '0x09'
  })
  const result = commands.map(({hash, command,detail}) => {
    const info = ethers.utils.defaultAbiCoder.decode(ABI_DEFINITION[command], detail)
    if (info['3'].length === 2) return null
    return {
      ...info,
      hash
    }
    return {
      ...commandS[command](info),
      hash
    }
  }).filter(i => i)

  console.log(result)
}

formatUniVe();
import { swapTokensForTokens, formatExactInput } from './common.js'
import { ethers } from 'ethers'
import _ from 'lodash'

export const CommandType = {
  V3_SWAP_EXACT_IN: '0x00',
  V3_SWAP_EXACT_OUT: '0x01',
  V2_SWAP_EXACT_IN: '0x08',
  V2_SWAP_EXACT_OUT: '0x09',
}
export const ABI_DEFINITION  = {
  [CommandType.V3_SWAP_EXACT_IN]: ['address', 'uint256', 'uint256', 'bytes', 'bool'],
  [CommandType.V3_SWAP_EXACT_OUT]: ['address', 'uint256', 'uint256', 'bytes', 'bool'],
  [CommandType.V2_SWAP_EXACT_IN]: ['address', 'uint256', 'uint256', 'address[]', 'bool'],
  [CommandType.V2_SWAP_EXACT_OUT]: ['address', 'uint256', 'uint256', 'address[]', 'bool'],
}
export const COMMONDS = {
  [CommandType.V3_SWAP_EXACT_IN]: (params) => {
    const tmp = formatExactInput(params[3].slice(2))
    return tmp.map(({
      tokenA,
      tokenB,
      fee,
      poolPath,
      invertedPoolPath,
    }, i )=>{
      return {
        poolPath,
        invertedPoolPath,
        poolType: 'uniV3',
        tokenA,
        tokenB,
        fee,
        amountIn: i===0 ?ethers.BigNumber.from(params[1]) : ethers.BigNumber.from('0'),
        amountOut: i===tmp.length-1 ?ethers.BigNumber.from(params[2]) : ethers.BigNumber.from('0'),
        to: i === tmp.length - 1 ? params[0] : '0x0000000000000000000000000000000000000002',
      }
    })
  },
  [CommandType.V3_SWAP_EXACT_OUT]: (params) => {
    const tmp = formatExactInput(params[3].slice(2))
    return tmp.map(({
      tokenA,
      tokenB,
      fee,
      poolPath,
      invertedPoolPath,
    }, i )=>{
      return {
        poolPath,
        invertedPoolPath,
        poolType: 'uniV3',
        tokenA: tokenB,
        tokenB: tokenA,
        fee,
        amountIn: i===tmp.length-1 ?ethers.BigNumber.from(params[2]) : ethers.BigNumber.from('0'),
        amountOut: i===0 ?ethers.BigNumber.from(params[1]) : ethers.BigNumber.from('0'),
        to: i === tmp.length - 1 ? params[0] : '0x0000000000000000000000000000000000000002',
      }
    })
  },
  [CommandType.V2_SWAP_EXACT_IN]: (params) => {
    console.log(params)
    return swapTokensForTokens({
      amountIn: params[1], 
      amountOut: params[2], 
      path: params[3].map(i => `0x${i.slice(2)}`),
      to: params[0].slice(2)
    })
  },
  [CommandType.V2_SWAP_EXACT_OUT]: (params) => {
    return swapTokensForTokens({
      amountIn: params[2], 
      amountOut: params[1], 
      path: params[3].map(i => `0x${i.slice(2)}`),
      to: params[0].slice(2)
    })
  },
}
const dataFormatter = {
  execute: (params) => {
    const tmp = params[1].map((p,index) => {
      const command = "0x" + params[0][index * 2 + 2] + params[0][index * 2 + 3]
      console.log(command)
      if(!ABI_DEFINITION[command]) return null
      const info = ethers.utils.defaultAbiCoder.decode(ABI_DEFINITION[command], p)
      const result = COMMONDS[command] && COMMONDS[command](info)
      return result
    }).filter(i => i);
    return _.flatten(tmp)
  }
}

export default (parsedData) => {
  return dataFormatter[parsedData.name](parsedData.args)
}

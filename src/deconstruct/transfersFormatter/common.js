import { ethers } from 'ethers'

export const swapTokensForTokens = ({ amountIn, amountOut, path, to}) => {
  return path.slice(0, path.length - 1).map((tokenA,i) => {
    return {
      poolType: 'uniV2',
      tokenIn: '0x' + tokenA.toLowerCase(),
      tokenOut: '0x' + path[i+1].toLowerCase(),
      amountIn: i===0 ?ethers.BigNumber.from(amountIn) : ethers.BigNumber.from('0'),
      amountOut: i === path.length - 2 ?ethers.BigNumber.from(amountOut) : ethers.BigNumber.from('0'),
      to: i === path.length - 2 ? `0x${to}` : '0x0000000000000000000000000000000000000002',
    }
  });
}

export const formatExactInput = (path) => {
  let result = []
  const tokenA = path.slice(0, 40);
  const fee = path.slice(40, 46);
  const tokenB = path.slice(46, 86);
  result = [{
    poolPath: `0x${path}`,
    invertedPoolPath: `0x${tokenB}${fee}${tokenA}`,
    tokenIn: `0x${tokenA}`,
    tokenOut: `0x${tokenB}`,
    fee: ethers.utils.formatUnits(`0x${fee}` ,'wei')
  }]
  if (path.slice(46).length > 40) {
    result.push(...formatExactInput(path.slice(46)))
  }
  return result
}

export const transfersGroupBy = (data) => {
  const transfers = data.reduce((result, i, key) => {
    if(key === 0) {
      result.push([])
    }
    result[result.length-1].push(i)
    if(i.to != '0x0000000000000000000000000000000000000002') {
      result.push([])
    }
    return result
  },[]).filter(item => item.length)
  return transfers
}
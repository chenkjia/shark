import { ethers } from 'ethers'
export const swapTokensForTokens = ({ amountIn, amountOut, path, to}) => {
  return path.slice(0, path.length - 1).map((tokenA,i) => {
    return {
      poolType: 'uniV2',
      tokenA: '0x' + tokenA.toLowerCase(),
      tokenB: '0x' + path[i+1].toLowerCase(),
      amountIn: i===0 ?ethers.BigNumber.from(amountIn) : ethers.BigNumber.from('0'),
      amountOut: i === path.length - 2 ?ethers.BigNumber.from(amountOut) : ethers.BigNumber.from('0'),
      to: i === path.length - 2 ? `0x${to}` : '0x0000000000000000000000000000000000000002',
    }
  });
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
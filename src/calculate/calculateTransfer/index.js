import uniV2 from './uniV2.js'
import { ethers } from 'ethers';
import { TOKEN } from '../../constants/index.js';
const poolsFunc = {
  uniV2,
  uniV3: uniV2
}

export default (target) => {
  let {
    amountIn,
    amountOut,
    tokenA,
    reserveIn,
    reserveOut
  } = target;
  if (!TOKEN.LOW_TOKEN_OBJECT[tokenA]) {
    return {
      isInverse: true
    }
  }
  amountIn = ethers.BigNumber.from(amountIn._hex)
  amountOut = ethers.BigNumber.from(amountOut._hex)
  reserveIn = ethers.BigNumber.from(reserveIn._hex)
  reserveOut = ethers.BigNumber.from(reserveOut._hex)
  
  const optimalTokenIn = poolsFunc[target.poolType].calcSandwichOptimalIn(
    amountIn,
    amountOut,
    reserveIn,
    reserveOut,
    tokenA
  )
  const sandwichStates = poolsFunc[target.poolType].calcSandwichState(
    optimalTokenIn,
    amountIn,
    amountOut,
    reserveIn,
    reserveOut
  );
  return sandwichStates
}
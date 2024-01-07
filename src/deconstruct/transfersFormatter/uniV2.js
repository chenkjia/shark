import { swapTokensForTokens } from './common.js'
import _ from 'lodash'
const dataFormatter = {
  swapExactTokensForETH: (params) => {
    const [ amountIn, amountOut, path, to] = params;
    return swapTokensForTokens({amountIn, amountOut, path, to})
  },
  swapTokensForExactTokens: (params) => {
    const [ amountOut, amountIn, path, to] = params;
    return swapTokensForTokens({amountIn, amountOut, path, to})
    
  },
  swapExactTokensForTokens: (params) => {
    const [amountIn, amountOut, path, to] = params;
    return swapTokensForTokens({amountIn, amountOut, path, to})
  },
  swapExactTokensForETHSupportingFeeOnTransferTokens: (params) => {
    const [amountIn, amountOut, path, to] = params;
    return swapTokensForTokens({amountIn, amountOut, path, to})
  },
}

export default (parsedData) => {
  return dataFormatter[parsedData.name](parsedData.args)
}

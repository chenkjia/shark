import { ethers } from 'ethers';

import { tenderlyProvider } from '../libs/provider.js'

const tenderly = async (method, params, blockHeight) => {
  return await tenderlyProvider.send(method, [
    params,
    ethers.utils.hexValue(blockHeight)
  ]);
}

export const ethCall = async(params, blockHeight) => {
  return await tenderly('eth_Call',params, blockHeight)
}

export const simulateTransaction = async(params, blockHeight) => {
  return await tenderly('tenderly_simulateTransaction',params, blockHeight)
}

export const simulateBundle = async(params, blockHeight) => {
  return await tenderly('tenderly_simulateBundle',params, blockHeight)
}
import { ethers } from "ethers";
export const txFormat = (data) => {
  const {
    hash,
    type,
    accessList,
    blockHash,
    blockNumber,
    transactionIndex,
    from,
    gasPrice,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gas,
    to,
    value,
    nonce,
    input,
    r,
    s,
    v,
    chainId
  } = data
  return {
    hash,
    type: ethers.BigNumber.from(type).toNumber(),
    accessList,
    blockHash,
    blockNumber,
    transactionIndex,
    from,
    gasPrice,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gasLimit: gas,
    to,
    value,
    nonce,
    data: input,
    r,
    s,
    v,
    chainId
  }
};

export const isInverted = (tokenA, tokenB) => ethers.BigNumber.from(tokenA).gt(tokenB);
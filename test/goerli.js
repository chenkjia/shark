import { wssGoerliProvider, searcherWallet } from '../src/libs/provider.js'
import { ethers } from 'ethers';
const nonce = await wssGoerliProvider.getTransactionCount(searcherWallet.address);

const myContract = '0x1cdde4cd51e91e6aa88cd17906b02c7d0ba54be9'

const tokenA = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
const tokenB = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
const v = ethers.BigNumber.from(tokenA).lt(ethers.BigNumber.from(tokenB)) ? 0 : 1;

const frontslicePayload = ethers.utils.solidityPack(
  ["address", "address", "uint128", "uint128", "uint8"],
  [
    tokenA,
    '0x07A4f63f643fE39261140DF5E613b9469eccEC86',
    ethers.utils.parseEther('0.000007').toNumber(),
    ethers.utils.parseEther('0.0000005').toNumber(),
    v,
  ]
);

const frontsliceTx = {
  to: myContract,
  from: searcherWallet.address,
  data: frontslicePayload,
  chainId: 5,
  gasPrice: ethers.utils.parseUnits('10', 'gwei').toNumber(),
  maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei').toNumber(),
  maxFeePerGas: ethers.utils.parseUnits('10', 'gwei').toNumber(),
  gasLimit: 750000,
  nonce,
  type: 2,
};
console.log(frontsliceTx)
const frontsliceTxSigned = await searcherWallet.signTransaction(frontsliceTx);
console.log(frontsliceTxSigned)
const result = await wssGoerliProvider.sendTransaction(frontsliceTxSigned);
console.log(result)

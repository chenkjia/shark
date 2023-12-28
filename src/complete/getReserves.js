import { INTERFACE } from '../constants/index.js'
import { ethCall } from '../libs/ethCall.js';
import { isInverted } from '../libs/utils.js'
import { ethers } from 'ethers';

const uniV2Interface =  INTERFACE.INTERFACE_POOL_UNIV2
// 生成访问合约的inputData
const getReservesData = uniV2Interface.encodeFunctionData('getReserves');

const getReservesV2 = async (transfer, contract, blockHeight) => {
  const result = await ethCall({
    to: contract,
    data: getReservesData
  }, blockHeight)
  // 解析数据
  const decodeResult = uniV2Interface.decodeFunctionResult('getReserves', result)
  const invert = isInverted(transfer.tokenA,transfer.tokenB)
  const reserves = {
    reserveIn: invert ? decodeResult[1] : decodeResult[0],
    reserveOut: invert ? decodeResult[0] : decodeResult[1]
  }
  return reserves
}


// // 计算储备量的辅助函数
// const calculateReserve = (sqrtPriceX96, liquidity, isToken0) => {
//   const liquidityMultiplier = isToken0 ? sqrtPriceX96 : 1 / sqrtPriceX96;
//   const reserve = liquidity * liquidityMultiplier * liquidityMultiplier / (2**96);
//   return reserve;
// }

// const uniV3Interface =  INTERFACE.INTERFACE_POOL_UNIV3
// // 生成访问合约的inputData
// const slot0Data = uniV3Interface.encodeFunctionData('slot0');
// const liquidityData = uniV3Interface.encodeFunctionData('liquidity');

// const getReservesV3 = async (contract, blockHeight) => {
//   const result = await Promise.all([
//     ethCall({
//       to: contract,
//       data: slot0Data
//     }, blockHeight),
//     ethCall({
//       to: contract,
//       data: liquidityData
//     }, blockHeight)
//   ])
//   const slot0 = uniV3Interface.decodeFunctionResult('slot0', result[0])
//   const sqrtPriceX96 = slot0.sqrtPriceX96;
//   const liquidity = uniV3Interface.decodeFunctionResult('liquidity', result[1])
//   console.log('sqrtPriceX96')
//   console.log(slot0)
//   console.log(sqrtPriceX96)
//   console.log(liquidity[0])
//   const reserves = {
//     token0: calculateReserve(sqrtPriceX96, liquidity, true),
//     token1: calculateReserve(sqrtPriceX96, liquidity, false),
//   };

//   // reserves.token0 = ethers.BigNumber.from(reserves.token0);
//   // reserves.token1 = ethers.BigNumber.from(reserves.token1);
//   return reserves;
// }

const erc20Interface =  INTERFACE.INTERFACE_ERC20
// 生成访问合约的inputData

const getReservesV3 = async (transfer, contract, blockHeight) => {
  const result = await Promise.all([
    ethCall({
      to: transfer.tokenA,
      data: erc20Interface.encodeFunctionData('balanceOf',[contract])
    }, blockHeight),
    ethCall({
      to: transfer.tokenB,
      data: erc20Interface.encodeFunctionData('balanceOf',[contract])
    }, blockHeight)
  ])
  const tokenA = erc20Interface.decodeFunctionResult('balanceOf', result[0])
  const tokenB = erc20Interface.decodeFunctionResult('balanceOf', result[1])
  // const sqrtPriceX96 = slot0.sqrtPriceX96;
  // const liquidity = uniV3Interface.decodeFunctionResult('liquidity', result[1])
  // console.log('sqrtPriceX96')
  // console.log(slot0)
  // console.log(sqrtPriceX96)
  // console.log(liquidity[0])
  const reserves = {
    reserveIn: tokenA[0],
    reserveOut: tokenB[0]
  }
  return reserves;
}

export default async(transfer, contract, blockHeight) =>{

  return transfer.poolType === 'uniV3' ?
    await getReservesV3(transfer, contract, blockHeight) :
    transfer.poolType === 'uniV2' ?
      getReservesV2(transfer, contract, blockHeight): null

  // 获取数据
}
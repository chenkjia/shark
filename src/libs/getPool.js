import keccak256 from 'keccak256'
import { ethers } from 'ethers';
import { searcherWallet } from './provider.js'
// export const calculatePoolAddressV2 = (token0Address, token1Address) => {
//   const sortedTokens = [token0Address, token1Address].sort();

//   const poolAddress = crypto
//     .createHash('sha3-256')
//     .update(
//       Buffer.from(
//         'ff' +
//           sortedTokens[0].slice(2) +
//           sortedTokens[1].slice(2),
//         'hex'
//       )
//     )
//     .digest('hex')
//     .slice(0, 42);

//   return poolAddress;
// }
export const calculatePoolAddressV2 = (tokenA, tokenB) => {
  const sortedTokens = [tokenA, tokenB].sort()
  const [token0, token1] = sortedTokens

  const salt = ethers.utils.keccak256(token0 + token1.replace("0x", ""));
  const address = ethers.utils.getCreate2Address( 
    "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Factory address (contract creator)
    salt,
    "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" // init code hash
  );

  return address;
};

const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
// 创建一个Contract工厂实例，用于调用Uniswap V3工厂合约
const factoryContract = new ethers.Contract(factoryAddress, ['function getPool(address,address,uint24) view returns (address)'], searcherWallet);

export const calculatePoolAddressV3 = async (token0, token1, fee) => {
  // 计算Uniswap V3池地址
  const poolAddress = await factoryContract.getPool(token0, token1, fee)
  return poolAddress;
}
export const calculatePoolAddress = async ({
  poolType,
  tokenA,
  tokenB,
  fee
}) => {
  return poolType === 'uniV3' ?
    await calculatePoolAddressV3(tokenA,tokenB,fee) :
    poolType === 'uniV2' ?
      calculatePoolAddressV2(tokenA,tokenB): null
}
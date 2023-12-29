import { ethers } from "ethers";
/*
 Uniswap v2; x * y = k formula

 How much out do we get if we supply in?
*/
export const getUniv2DataGivenIn = (aIn, reserveA, reserveB) => {
  const aInWithFee = aIn.mul(997);
  const numerator = aInWithFee.mul(reserveB);
  const denominator = aInWithFee.add(reserveA.mul(1000));
  const bOut = numerator.div(denominator);

  // Underflow
  let newReserveB = reserveB.sub(bOut);
  if (newReserveB.lt(0) || newReserveB.gt(reserveB)) {
    newReserveB = ethers.BigNumber.from(1);
  }

  // Overflow
  let newReserveA = reserveA.add(aIn);
  if (newReserveA.lt(reserveA)) {
    newReserveA = ethers.constants.MaxInt256;
  }

  return {
    amountIn: aIn,
    amountOut: bOut,
    newReserveA,
    newReserveB,
  };
};

/*
 Uniswap v2; x * y = k formula

 How much in do we get if we supply out?
*/
export const getUniv2DataGivenOut = (bOut, reserveA, reserveB) => {
  // Underflow
  let newReserveB = reserveB.sub(bOut);
  if (newReserveB.lt(0) || reserveB.gt(reserveB)) {
    newReserveB = ethers.BigNumber.from(1);
  }

  const numerator = reserveA.mul(bOut).mul(1000);
  const denominator = newReserveB.mul(997);
  const aAmountIn = numerator.div(denominator).add(ethers.constants.One);

  // Overflow
  let newReserveA = reserveA.add(aAmountIn);
  if (newReserveA.lt(reserveA)) {
    newReserveA = ethers.constants.MaxInt256;
  }

  return {
    amountIn: aAmountIn,
    amountOut: bOut,
    newReserveA,
    newReserveB,
  };
};
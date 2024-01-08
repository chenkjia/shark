import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { getUniv2DataGivenIn, getUniv2DataGivenOut } from "./common.js";

// import { UniV2PairABI } from '../abi/index.js';
import { TOKEN } from '../../constants/index.js';

const BN_18 = parseUnits("1");

/*
  Binary search to find optimal sandwichable amount

  Using binary search here as the profit function isn't normally distributed
*/
export const binarySearch = (
  left, // Lower bound
  right, // Upper bound
  calculateF, // Generic calculate function
  passConditionF, // Condition checker
  tolerance = parseUnits("0.01"), // Tolerable delta (in %, in 18 dec, i.e. parseUnits('0.01') means left and right delta can be 1%)
  result = []
) => {
  if (right.sub(left).gt(tolerance.mul(right.add(left).div(2)).div(BN_18))) {
    const mid = right.add(left).div(2);
    const out = calculateF(mid);

    // If we pass the condition
    // Number go up
    if (passConditionF(out)) {
      return binarySearch(mid, right, calculateF, passConditionF, tolerance, [...result, mid]);
    }

    // Number go down
    return binarySearch(left, mid, calculateF, passConditionF, tolerance, [...result, mid]);
  }

  // No negatives
  // const ret = right.add(left).div(2);
  // if (ret.lt(0)) {
  //   return ethers.constants.Zero;
  // }

  // return ret;
  const ret = right.add(left).div(2);
  const list = [...result, ret].filter(item => {
    return passConditionF(calculateF(item))
  })
  const r = list[list.length - 1]
  if (!r || r.lt(0)) {
    return ethers.constants.Zero;
  }
  return r;
};
/*
  Calculate the max sandwich amount
*/

export const calcSandwichOptimalIn = (
  userAmountIn,
  userMinRecvToken,
  reserveWeth,
  reserveToken,
  targetToken
) => {
  // Note that user is going from WETH -> TOKEN
  // So, we'll be pushing the price of TOKEn
  // by swapping WETH -> TOKEN before the user
  // i.e. Ideal tx placement:
  // 1. (Ours) WETH -> TOKEN (pushes up price)
  // 2. (Victim) WETH -> TOKEN (pushes up price more)
  // 3. (Ours) TOKEN -> WETH (sells TOKEN for slight WETH profit)
  const calcF = (amountIn) => {
    const frontrunState = getUniv2DataGivenIn(
      amountIn,
      reserveWeth,
      reserveToken
    );
    const victimState = getUniv2DataGivenIn(
      userAmountIn,
      frontrunState.newReserveA,
      frontrunState.newReserveB
    );
    return victimState.amountOut;
  };

  // Our binary search must pass this function
  // i.e. User must receive at least min this
  const passF = (amountOut) => amountOut.gte(userMinRecvToken);
  const upperBound = parseUnits(TOKEN.LOW_TOKEN_OBJECT[targetToken].amount);
  const lowerBound = parseUnits("0");
  // Optimal WETH in to push reserve to the point where the user
  // _JUST_ receives their min recv
  const optimalWethIn = binarySearch(lowerBound, upperBound, calcF, passF, parseUnits("0.1"), [],{
    userAmountIn,
    userMinRecvToken,
    reserveWeth,
    reserveToken
  } );
  return optimalWethIn.gt(upperBound) ? upperBound : optimalWethIn;
};

export const calcSandwichState = (
  optimalSandwichWethIn,
  userWethIn,
  userMinRecv,
  reserveWeth,
  reserveToken
) => {
  const frontrunState = getUniv2DataGivenIn(
    optimalSandwichWethIn,
    reserveWeth,
    reserveToken
  );
  const victimState = getUniv2DataGivenIn(
    userWethIn,
    frontrunState.newReserveA,
    frontrunState.newReserveB
  );
  // const backrunState = getUniv2DataGivenIn(
  //   frontrunState.amountOut,
  //   victimState.newReserveB,
  //   victimState.newReserveA
  // );
  const backrunState = getUniv2DataGivenOut(
    optimalSandwichWethIn,
    victimState.newReserveB,
    victimState.newReserveA
  )
  if (victimState.amountOut.lt(userMinRecv)) {
    return {
      // 如何定义计算交易量太少无法攻击
    };
  }

  return {
    revenue: frontrunState.amountOut.sub(backrunState.amountIn),
    optimalSandwichWethIn,
    userAmountIn: userWethIn,
    userMinRecv,
    reserveState: {
      reserveWeth,
      reserveToken,
    },
    frontrun: frontrunState,
    victim: victimState,
    backrun: backrunState,
  };
};
export default {
  calcSandwichOptimalIn,
  calcSandwichState
}

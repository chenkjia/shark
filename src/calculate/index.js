import { ethers } from 'ethers'
import { read, update } from '../libs/mongodbClient.js'
import calculateTransfer from './calculateTransfer/index.js'
// 定义解构数据机器人
const calculateBot = () => {
}

export const calculateBatch = async () => {
  const dbName = 'eagle'
  const collectionName = 'transfers'
  // 定时读取mongodb的transfer数据,需要过滤iscalculate的数据
  const waitForCalculate = await read(dbName, collectionName, {
    isSandWich: false,
    isAbandon: false,
    isComplete: true,
    // isCalculate: { $ne: true },
    transfers:{ $size:1 }
  })
  // 如果有数据未calculate,则对该数据执行calculate方法
  for (const item of waitForCalculate) {
    await calculate(dbName, collectionName, item);
  }
}
const calculate = async (dbName, collectionName, tx) => {
  for (const transfer of tx.transfers) {
    console.log(tx)
    const result = calculateTransfer(transfer);
    const canSandWich = result.revenue ? result.revenue.gt(ethers.constants.Zero) : false
    await update(dbName, collectionName, tx, {
      isCalculate: true,
      isInverse: !!result.isInverse,
      revenue: result.revenue,
      canSandWich
    })
  }
}
export default calculate
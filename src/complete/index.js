
import { read, update } from '../libs/mongodbClient.js'
import { calculatePoolAddress } from '../libs/getPool.js'
import getReserves from './getReserves.js'
// import { forEach } from 'lodash'
// 补全数据
const completeBot = async () => {
}
// 补全数据
export const completeBatch = async () => {
  const dbName = 'eagle'
  const collectionName = 'transfers'
  // 定时读取mongodb的transfer数据,需要过滤isComplete的数据
  const waitForComplete = await read(dbName, collectionName, {
    isSandWich: false,
    isAbandon: false,
    isDeconstruct: true,
    isComplete: { $ne: true },
    // transfers: {$size:2}
  // }, {
  //   limit: 1,
  //   skip: 0
  })
  // 如果有数据未Complete,则对该数据执行Complete方法
  for (const item of waitForComplete) {
    await complete(dbName, collectionName, item);
  }
}
export const complete = async (dbName, collectionName, transfer) => {
  console.log(transfer.hash)
  for (let index = 0; index < transfer.transfers.length; index++) {
    const item = transfer.transfers[index];
    const pairAddress = await calculatePoolAddress(item)
    // const resverse = await getReserves(item, pairAddress, 18880839)
    const resverse = await getReserves(item, pairAddress, transfer.blockNumber)
    console.log(resverse)
    console.log(index)
    await update(dbName, collectionName, transfer, {
      isComplete: true,
      [`transfers.${index}`]: {
        ...item,
        ...resverse,
        pairAddress
      }
    })
  }
  // transfer.transfers.forEach(async (item, index) => {
  //     const pairAddress = await calculatePoolAddress(item)
  //     // const resverse = await getReserves(item, pairAddress, 18880839)
  //     const resverse = await getReserves(item, pairAddress, transfer.blockNumber)
  //     console.log(resverse)
  //     console.log(index)
  //     await update(dbName, collectionName, transfer, {
  //       [`transfers.${index}`]: {
  //         ...item,
  //         ...resverse,
  //         pairAddress
  //       }
  //     })
  //     // const result = await collection.updateOne(
  //     //   { _id: ObjectId(documentId) },
  //     //   { $set: { [`list.${listItemIndex}`]: updatedData } }
  //     // );
    
  // });
  // for (const item of transfer.transfers) {
  //   const pairAddress = await calculatePoolAddress(item)
  //   console.log('pairAddress')
  //   console.log(pairAddress)
  //   const resverse = await getReserves(item, pairAddress, 18880839)
  //   // const resverse = await getReserves(item, pairAddress, transfer.blockNumber)
  //   console.log(resverse)

  //   // const result = await collection.updateOne(
  //   //   { _id: ObjectId(documentId) },
  //   //   { $set: { [`list.${listItemIndex}`]: updatedData } }
  //   // );
  // }
}


// (async () => {
//   complete();
// })();
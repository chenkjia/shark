import { read, update } from '../libs/mongodbClient.js'
import getEigenphi from './getEigenphi.js'
import getTx from './getTx.js'

// 定义清理数据机器人
const cleanUpBot = () => {
  // 定时读取mongodb的transfer数据,需要过滤isCleanUp的数据

  // 如果有数据未cleanUp,则对该数据执行cleanUp方法
  // const waitForcleanUp = []
  // waitForcleanUp.forEach(item => {
  //   cleanUp(item)
  // });
}

// 定义清理数据函数
export const cleanUpBatch = async () => {
  const dbName = 'eagle'
  const collectionName = 'transfers'
  // 定时读取mongodb的transfer数据,需要过滤isCleanUp的数据
  const waitForcleanUp = await read(dbName, collectionName, {
    isCleanUp: { $ne: true }
  })
  // 如果有数据未cleanUp,则对该数据执行cleanUp方法
  for (const item of waitForcleanUp) {
    await cleanUp(dbName, collectionName, item);
  }
}
const cleanUp = async (dbName, collectionName, transfer) => {
  // 通过时间和blockNum确认其是否为过期数据，如果是，则将数据加一个isAbandon状态
  const tx = await getTx(transfer.hash);
  let set = {}
  if (tx) {
    const { blockHash, blockNumber, transactionIndex } = tx
    set = { blockHash, blockNumber, transactionIndex, isAbandon: false }
  } else {
    set = { isAbandon: true }
  }
  // 通过getEigenphi判断是否该交易已被夹，将是否被夹的信息保存进数据库
  const eigenphi = await getEigenphi(transfer.hash);
  // 最后为数据加上isCleanUp:true的状态
  if (eigenphi.txMeta) {
    const {transactionToAddress,gasPrice} = eigenphi.txMeta
    set.isSandWich = true
    set.sandwich = {transactionToAddress,gasPrice}
  }
  set.isCleanUp = true
  // 保存进mongodb
  const result = await update(dbName, collectionName, transfer, set)
}
export default cleanUpBot
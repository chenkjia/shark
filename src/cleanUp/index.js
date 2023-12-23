import { read, update } from '../libs/mongodbClient.js'
import getEigenphi from './getEigenphi.js'

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
  // 定时读取mongodb的transfer数据,需要过滤isCleanUp的数据
  // const waitForcleanUp = await read('eagle', 'transfers', { isCleanUp: { $ne: true } })
  const waitForcleanUp = await read('eagle', 'transfers')
  // 如果有数据未cleanUp,则对该数据执行cleanUp方法
  for (const item of waitForcleanUp) {
    await cleanUp(item);
  }
}
const cleanUp = async (transfer) => {
  // 通过时间和blockNum确认其是否为过期数据，如果是，则将数据加一个isAbandon状态

  // 通过getEigenphi判断是否该交易已被夹，将是否被夹的信息保存进数据库
  const eigenphi = await getEigenphi(transfer.hash);
  // sandWich:{transactionToAddress,gasPrice}
  // 最后为数据加上isCleanUp:true的状态
  let set = {}
  if (eigenphi.txMeta) {
    const {transactionToAddress,gasPrice} = eigenphi.txMeta
    set = {
      isSandWich: true,
      isCleanUp: true,
      sandwich: {transactionToAddress,gasPrice}
    }
  } else {
    set = {
      isCleanUp: true,
      isSandWich: false,
    }
  }
  // 保存进mongodb
  const result = await update('eagle', 'transfers', transfer, set)
  console.log(result)
}
export default cleanUpBot
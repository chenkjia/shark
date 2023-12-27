import { ROUTER_LOW_INVERT } from "../constants/index.js"
import { read, update } from '../libs/mongodbClient.js'
import decode from './decode.js'
import transfersFormatter from "./transfersFormatter/index.js"
// 定义解构数据机器人
const deconstructBot = () => {
}

export const deconstructBatch = async () => {
  const dbName = 'eagle'
  const collectionName = 'transfers'
  // 定时读取mongodb的transfer数据,需要过滤isDeconstruct的数据
  const waitForDeconstruct = await read(dbName, collectionName, {
    isSandWich:false,
    isDeconstruct: { $ne: true }
  })
  // 如果有数据未deconstruct,则对该数据执行deconstruct方法
  for (const item of waitForDeconstruct) {
    await deconstruct(dbName, collectionName, item);
  }
}
const deconstruct = async (dbName, collectionName, tx) => {
  const routerName = ROUTER_LOW_INVERT[tx.to]
  // 需要对ROUTER的ABI出来的数据进行分析
  console.log(tx)
  const decodeData = decode(routerName, tx)
  const transfers = transfersFormatter(routerName, decodeData)
  let set = {}
  if (transfers.length) {
    set = {
      isDeconstruct: true,
      transfers
    }
    const result = await update(dbName, collectionName, tx, set)
  }
  // 保存进mongodb
  // 识别整个交易链路
  // 单个交易的情况
  // 多个交易的情况
  // 是否有某个交易明确交易量（监控机器人需要识别且是我们监控的TOKEN）
  // 如果有，则以此交易执行单个交易
  // 如果没有，则需要获取该链路上所有池子的信息
}
export default deconstruct
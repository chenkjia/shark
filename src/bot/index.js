import getTransfers from "./getTransfers/index.js";
import { insert } from '../libs/mongodbClient.js'

import _ from 'lodash';
let tmpTransfers = []
let tmpCommands = []

const insertTransfers = async () => {
  // 插入tx数据
  if (tmpTransfers.length) {
    const cloneTransfers = _.cloneDeep(tmpTransfers)
    tmpTransfers = []
    await insert('eagle', 'transfers', cloneTransfers)
  }
  // 插入Transfers数据
  if (tmpCommands.length) {
    const cloneCommands = _.cloneDeep(tmpCommands)
    tmpCommands = []
    await insert('eagle', 'commands', cloneCommands)
  }
}

setInterval(insertTransfers, 10000);


// Connect to the MongoDB server
const bot = (txData) => {
  console.log(txData.hash)
  tmpTransfers = [...tmpTransfers, txData]
  const transfers = getTransfers(txData)
  tmpCommands = [...tmpCommands, ...transfers]
}
export default bot;
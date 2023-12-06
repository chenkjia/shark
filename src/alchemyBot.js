import { txFormat } from './libs/utils.js'
import { TOKEN } from './constants/index.js'
import bot from './bot/index.js'

const { LOW_TOKEN_ARRAY } = TOKEN

const alchemyBot = (alchemyData) => {
  // 判断是否包含我们拥有的token，如果没有，跳出
  const hasToken = LOW_TOKEN_ARRAY.some(token => alchemyData.input.indexOf(token) !== -1)
  if (!hasToken) {
    return;
  }
  // 对alchemy的数据进行格式化
  const tx = txFormat(alchemyData)
  // 执行正式的机器人
  bot(tx)
}
export default alchemyBot;
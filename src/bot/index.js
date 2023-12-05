import { txFormat } from '../libs/utils.js'
import { TOKEN } from '../constants/index.js'
const { LOW_TOKEN_ARRAY } = TOKEN
// import transferFormatter from './transferFormatter/index.js'
const bot = (alData) => {
  const {hash, input, to} = alData
  // 判断是否包含我们拥有的token，如果没有，跳出
  const hasToken = LOW_TOKEN_ARRAY.some(token => input.indexOf(token) !== -1)
  if (!hasToken) {
    return;
  }
  // 对alchemy的数据进行格式化
  const tx = txFormat(alData)
  console.log(hash)
  // const transfers = transferFormatter[to](tx)
}
export default bot;
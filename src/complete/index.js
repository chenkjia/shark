
import { read } from '../libs/mongodbClient.js'
// 补全数据
const complete = async () => {
  // 从mongodb获取所有未补全的数据
  const transfers = await read('c', 'transfers', {
  }, {limit:5})
  console.log(transfers)
  // 远程请求需要补全的数据
  // 填充完更新mongodb的数据
}


(async () => {
  complete();
})();
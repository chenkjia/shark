import { aggregate } from '../libs/mongodbClient.js'
export const analysis = async () => {
  const dbName = 'eagle'
  const collectionName = 'transfers'
  // 定时读取mongodb的transfer数据,需要过滤isCleanUp的数据
  const total = await aggregate(dbName, collectionName, [{$count:"count"}])
  console.log(`监控到总数为：${total[0].count}`)
  const isSandWichTotal = await aggregate(dbName, collectionName, [
    {
      $match:{
        isSandWich: true
      }
    },
    {$count:"count"}
  ])
  console.log(`已被夹的总数为：${isSandWichTotal[0].count}`)
  const notDeconstructTotal = await aggregate(dbName, collectionName, [
    {
      $match:{
        isCleanUp: true,
        isSandWich: false,
        isDeconstruct:{ $ne: true },
      }
    },
    {$count:"count"}
  ])
  console.log(`未能解构的数量为：${notDeconstructTotal[0].count}`)
  const isDeconstructTotal = await aggregate(dbName, collectionName, [
    {
      $match:{
        isDeconstruct:true,
      }
    },
    {$count:"count"}
  ])
  const simpleDeconstructTotal = await aggregate(dbName, collectionName, [
    {
      $match:{
        isDeconstruct: true,
        transfers: { "$size": 1}
      }
    },
    {$count:"count"}
  ])
  console.log(`单个交易的数量为：${simpleDeconstructTotal[0].count}`)
  console.log(`多个交易的数量为：${isDeconstructTotal[0].count-simpleDeconstructTotal[0].count}`)
}

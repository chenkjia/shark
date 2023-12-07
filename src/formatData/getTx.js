import { alchemy } from '../libs/provider.js'
import { insert } from '../libs/mongodbClient.js'

const getTx = async (hash) => {
  const response = await alchemy.transact.getTransaction(hash)
  const result = await insert('s', 'transfers',[response])
  console.log(result)
}

getTx('0x610927ec939bdd616934c1d52f431d7e3067d424058e78002f9a69d1ad98aa46');




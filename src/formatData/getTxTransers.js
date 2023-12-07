import { alchemy } from '../libs/provider.js'
import { read, insert} from '../libs/mongodbClient.js'

const getTxDetail = async (hash) => {
  const result = await read('s', 'transfers', { hash })
  const response = await alchemy.transact.getTransaction(result[0].hash)
  console.log(response)
}

getTxDetail('0x610927ec939bdd616934c1d52f431d7e3067d424058e78002f9a69d1ad98aa46');




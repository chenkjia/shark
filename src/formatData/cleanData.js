import {alchemy} from '../libs/provider.js'
import _ from 'lodash'
import { ethers } from 'ethers';
import mongodbClient from '../libs/mongodbClient.js'
import { ABI_DEFINITION, commandS } from '../bot/getTransfers/uniVe.js'
const dbName = 'c';

let tmpWaitData = []

const readcommands = async () => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection('commands');
  const filteredDocs = await collection.find({ command: '0x08' }).toArray();
  mongodbClient.close()
  return filteredDocs
}
const removeData = async () => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection('commands');
  const cloneWaitData = _.cloneDeep(tmpWaitData)
  tmpWaitData = []
  const d = await collection.deleteMany({$or: cloneWaitData});
  console.log(d)
  mongodbClient.close()
}

setInterval(removeData, 10000);

const cleanData = async () => {
  const commands = await readcommands()
  const result = commands.map(async ({hash}) => {
    const response = await alchemy.transact.getTransaction(hash)
    console.log(response)
    if(!response||!response.blockNumber){
      tmpWaitData = [...tmpWaitData, {hash}]
    }
  })
}

cleanData();
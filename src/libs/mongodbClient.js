
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const mongodbClient = new MongoClient(url);

export const insert = async (dbName, collectionName, data) => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertMany(data)
  mongodbClient.close()
  return result
}
export const read = async (dbName, collectionName, data) => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.find(data).toArray();
  mongodbClient.close()
  return result
}

export default mongodbClient
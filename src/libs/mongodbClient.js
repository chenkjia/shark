
import { MongoClient } from 'mongodb';
import { ENV } from '../constants/index.js';
const url = ENV.MONGODB;
const mongodbClient = new MongoClient(url);

export const insert = async (dbName, collectionName, data) => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertMany(data)
  mongodbClient.close()
  return result
}
export const read = async (dbName, collectionName, data = {}, params = {}) => {
  await mongodbClient.connect();
  const db = mongodbClient.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.find(data, params).toArray();
  mongodbClient.close()
  return result
}

export default mongodbClient
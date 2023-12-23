import axios from "axios";
//
export default async (hash) => {
  return await axios.get(`https://storage.googleapis.com/eigenphi-ethereum-tx/${hash}`)
    .then(({data}) => data).catch(error => ({}))
}

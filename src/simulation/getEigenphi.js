import axios from "axios";

const getEigenphi = async (hash) => {
  return await axios.get(`https://storage.googleapis.com/eigenphi-ethereum-tx/${hash}`)
    .then(({data}) => data).catch(error => ({}))
}

(async () => {
  const eigenphi = await getEigenphi('0xf230437246d5740fe09e72390bc8d1720da3453c3713e92edd1a43f21ac1d8e3');
  const {transactionToAddress,gasPrice} = eigenphi.txMeta
  console.log({transactionToAddress,gasPrice})
})();

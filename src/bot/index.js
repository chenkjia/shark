import getTransfers from "./getTransfers/index.js";
const bot = (txData) => {
  const transfers = getTransfers(txData)
  console.log(transfers)
}
export default bot;
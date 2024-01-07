
import getTx from '../src/cleanUp/getTx.js'
import decode from '../src/deconstruct/decode.js'
import transfersFormatter from "../src/deconstruct/transfersFormatter/index.js"
const getUniV3 = async (hash) => {
  const tx = await getTx(hash)
  const decodeData = decode('ROUTER_UNIVE', tx)
  const transfers = transfersFormatter('ROUTER_UNIVE', decodeData)
  return transfers
}


(async () => {
  const result = await getUniV3('0xa8d535a4c0f36df975997e9efc8bf0c1ce266c495d6c163d81e31ef3dc8adde5');
  console.log(result)
})();

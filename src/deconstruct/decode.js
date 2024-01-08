import { INTERFACE } from "../constants/index.js"

export default (routerName, tx) => {
  console.log(routerName)
  return INTERFACE[`INTERFACE_${routerName}`].parseTransaction({ data: tx.data })
}
import { INTERFACE } from "../constants/index.js"

export default (routerName, tx) => {
  return INTERFACE[`INTERFACE_${routerName}`].parseTransaction({ data: tx.data })
}
import ROUTER_UNIVE from './uniVe.js'
import ROUTER_UNIV2 from './uniV2.js'

const transferFormatter = {
  ROUTER_UNIVE,
  ROUTER_UNIV2
}

export default (routerName,data) => {
  return transferFormatter[routerName](data)
}
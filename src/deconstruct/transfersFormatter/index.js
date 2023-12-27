import ROUTER_UNIVE from './uniVe.js'

const transferFormatter = {
  ROUTER_UNIVE
}

export default (routerName,data) => {
  return transferFormatter[routerName](data)
}
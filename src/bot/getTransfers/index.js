import { ROUTER_LOW_INVERT } from '../../constants/index.js';
import ROUTER_UNIVE from './uniVe.js'

const decodeTransfer = {
  ROUTER_UNIVE
}

export default (tx) => {
  return decodeTransfer[ROUTER_LOW_INVERT[tx.to]](tx)
}
import { ethers } from 'ethers';
import ABI from './ABI/index.js';
export default {
  INTERFACE_UNIV2: new ethers.utils.Interface(ABI.ABI_ROUTER_UNIV2),
  INTERFACE_UNIV3: new ethers.utils.Interface(ABI.ABI_ROUTER_UNIV3)
}
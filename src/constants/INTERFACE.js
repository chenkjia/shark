import { ethers } from 'ethers';
import ABI from './ABI/index.js';
export default {
  INTERFACE_WETH: new ethers.utils.Interface(ABI.ABI_WETH),
  INTERFACE_ERC20: new ethers.utils.Interface(ABI.ABI_ERC20),
  INTERFACE_POOL_UNIV2: new ethers.utils.Interface(ABI.ABI_POOL_UNIV2),
  INTERFACE_POOL_UNIV3: new ethers.utils.Interface(ABI.ABI_POOL_UNIV3),
  INTERFACE_ROUTER_UNIV2: new ethers.utils.Interface(ABI.ABI_ROUTER_UNIV2),
  INTERFACE_ROUTER_UNIV3: new ethers.utils.Interface(ABI.ABI_ROUTER_UNIV3),
  INTERFACE_ROUTER_UNIVE: new ethers.utils.Interface(ABI.ABI_ROUTER_UNIVE)
}
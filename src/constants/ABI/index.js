import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default {
  ABI_WETH: require("./ABI_WETH.json"),
  ABI_POOL_UNIV2: require("./ABI_POOL_UNIV2.json"),
  ABI_ROUTER_UNIV2: require("./ABI_ROUTER_UNIV2.json"),
  ABI_ROUTER_UNIV3: require("./ABI_ROUTER_UNIV3.json"),
  ABI_ROUTER_UNIVE: require("./ABI_ROUTER_UNIVE.json")
}
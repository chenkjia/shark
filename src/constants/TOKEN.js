// 源token
const orginToken = [{
  name: 'WETH',
  address: 'C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
}]
const TOKEN = orginToken.map(token => {
  return {
    ...token,
    fullAddress: `0x${token.address}`,
    lowAddress: token.address.toLowerCase()
  }
})
const LOW_TOKEN_ARRAY = TOKEN.map(({lowAddress}) => lowAddress)

export default {
  LOW_TOKEN_ARRAY,
}
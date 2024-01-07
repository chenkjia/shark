import _ from 'lodash'
// 源token
const orginToken = [{
//   name: 'WETH',
//   address: 'C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
// }, {
  name: 'BEND',
  address: '0d02755a5700414B26FF040e1dE35D337DF56218',
  amount: '1000000'
}, {
  name: 'HIGH',
  address: '71Ab77b7dbB4fa7e017BC15090b2163221420282',
  amount: '1000000'
}, {
  name: 'X2Y2',
  address: '1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9',
  amount: '1000000'
}, {
  name: 'PUSH',
  address: 'f418588522d5dd018b425E472991E52EBBeEEEEE',
  amount: '1000000'
}, {
  name: 'MUTE',
  address: 'A49d7499271aE71cd8aB9Ac515e6694C755d400c',
  amount: '1000000'
}, {
  name: 'SHIDO',
  address: '72c60bFffEF18dCa51db32b52b819A951b6Ddbed',
  amount: '1000000'
// 下面是v3
}, {
  name: 'BLUR',
  address: '5283D291DBCF85356A21bA090E6db59121208b44',
  amount: '1000000'
}, {
  name: 'SUSHI',
  address: '6B3595068778DD592e39A122f4f5a5cF09C90fE2',
  amount: '1000000'
}, {
  name: 'COW',
  address: 'DEf1CA1fb7FBcDC777520aa7f396b4E015F497aB',
  amount: '1000000'
}, {
  name: 'DYDX',
  address: '92D6C1e31e14520e676a687F0a93788B716BEff5',
  amount: '1000000'
}]
const TOKEN = orginToken.map(token => {
  return {
    ...token,
    fullAddress: `0x${token.address}`,
    lowAddress: token.address.toLowerCase(),
    fullLowAddress:  `0x${token.address.toLowerCase()}`
  }
})
const LOW_TOKEN_OBJECT = _.keyBy(TOKEN, 'fullLowAddress')
const LOW_TOKEN_ARRAY = TOKEN.map(({lowAddress}) => lowAddress)

export default {
  LOW_TOKEN_ARRAY,
  LOW_TOKEN_OBJECT
}
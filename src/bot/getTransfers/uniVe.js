import { INTERFACE } from "../../constants/index.js"

const dataFormatter = {
  execute: (params) => {
    const commands = params[1].map((p,index) => {
      return "0x" + params[0][index * 2 + 2] + params[0][index * 2 + 3]
      // const info = ABI_DEFINITION[command] && ethers.utils.defaultAbiCoder.decode(ABI_DEFINITION[command], p)
      // const result = COMMONDS[command] && COMMONDS[command](info)
      // return result
    });
    return commands
    // console.log({
    //   commands: commands
    // })
    // CommandType
    // return mul.filter(i => i).reduce((r,i) => ([
    //   ...r,
    //   ...i
    // ]), []);
  }
}

export default (tx) => {
  const parsedData = INTERFACE.INTERFACE_UNIVE.parseTransaction({ data: tx.data });
  return {
    ...tx,
    commands: dataFormatter[parsedData.name](parsedData.args)
  };
}

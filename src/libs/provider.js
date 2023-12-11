// Globals
import { ENV } from "../constants/index.js";
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from "ethers";

export const alchemy = new Alchemy({ apiKey: ENV.ALCHEMY_KEY, network: Network.ETH_MAINNET}); 

export const wssProvider = new ethers.providers.WebSocketProvider(ENV.RPC_URL_WSS);
export const watcherWallet = new ethers.Wallet(ENV.WATCHER_KEY,wssProvider);
export const searcherWallet = new ethers.Wallet(ENV.PRIVATE_KEY,wssProvider);

export const tenderlyProvider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.gateway.tenderly.co/${ENV.TENDERLY_WEB3_GATEWAY_KEY}`
);
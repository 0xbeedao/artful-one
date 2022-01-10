import { NetworkConfig } from '@raidguild/quiver';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

export const SUPPORTED_NETWORKS: NetworkConfig = {
  1: {
    chainId: 1,
    name: "Mainnet",
    symbol: "ETH",
    explorer: "https://etherscan.io/tx/",
    rpc: "https://mainnet.infura.io/v3/ca89f3bdac9e4d688af96f8133d55f4d",
  },
  4: {
    chainId: 4,
    name: "Rinkeby",
    symbol: "ETH",
    explorer: "https://rinkeby.etherscan.io/",
    rpc: "https://rinkeby.infura.io/v3/ca89f3bdac9e4d688af96f8133d55f4d",
  },
  1337: {
    chainId: 1337,
    name: "Hardhat",
    symbol: "ETH",
    explorer: "http://localhost:1234/",
    rpc: "http://localhost:8545",
  },
};

export const PROVIDER_OPTIONS: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: SUPPORTED_NETWORKS[1].rpc,
        4: SUPPORTED_NETWORKS[4].rpc,
        1337: SUPPORTED_NETWORKS[1337].rpc,
      },
    },
  },
};

export const DEFAULT_NETWORK = 1; // Used to switch to if the user is on an unsupported network

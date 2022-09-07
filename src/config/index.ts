import { NetworkConfig } from "@raidguild/quiver";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

export const SUPPORTED_NETWORKS: NetworkConfig = {
	"0x539": {
		chainId: "0x539",
		name: "Hardhat",
		symbol: "ETH",
		explorer: "http://localhost:1234",
		rpc: "http://localhost:8545",
	},
	"0x89": {
		chainId: "0x89",
		name: "Polygon",
		symbol: "MATIC",
		explorer: "https://polygonscan.com",
		rpc: "https://polygon-rpc.com/",
	},
	"0x13881": {
		chainId: "0x13881",
		name: "Mumbai Testnet",
		symbol: "MATIC",
		explorer: "https://mumbai.polygonscan.com",
		rpc: "https://matic-mumbai.chainstacklabs.com",
	},
};

export const PROVIDER_OPTIONS: IProviderOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				0x539: SUPPORTED_NETWORKS["0x539"].rpc,
				0x89: SUPPORTED_NETWORKS["0x89"].rpc,
				0x13881: SUPPORTED_NETWORKS["0x13881"].rpc,
			},
		},
	},
};

export const DEFAULT_NETWORK = "0x89"; // Used to switch to if the user is on an unsupported network

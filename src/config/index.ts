import { NetworkConfig } from "@raidguild/quiver";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

import type { ChainContractDeployments } from "./types";

export const SUPPORTED_NETWORKS: NetworkConfig = {
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

export const CONTRACTS: ChainContractDeployments = {
	"0x89": {
		HeroicNamer: "0xE1352D4c52E5A10140816d876541aA37A739E4EC",
	},
	"0x13881": {
		HeroicNamer: "0x556a50f8E1fABE9c90FD5d5735a2f7AF4ca37283",
	},
};

export const PROVIDER_OPTIONS: IProviderOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				0x89: SUPPORTED_NETWORKS["0x89"].rpc,
				0x13881: SUPPORTED_NETWORKS["0x13881"].rpc,
			},
		},
	},
};

export const DEFAULT_NETWORK = "0x89"; // Used to switch to if the user is on an unsupported network

import { NetworkConfig } from "@raidguild/quiver";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

import type { Breakpoints, ChainContractDeployments } from "./types";

export const SUPPORTED_NETWORKS: NetworkConfig = {
	/* "0x64": {
		chainId: "0x64",
		name: "Gnosis",
		symbol: "XDAI",
		rpc: "https://rpc.gnosischain.com/",
		explorer: "https://blockscout.com/xdai/mainnet",
	}, */
	"0x89": {
		chainId: "0x89",
		name: "Polygon",
		symbol: "MATIC",
		explorer: "https://polygonscan.com",
		rpc: "https://polygon-rpc.com/",
	},
	"0x2329": {
		chainId: "0x2328",
		name: "Evmos",
		symbol: "EVMOS",
		explorer: "https://evm.evmos.org",
		rpc: "https://evmos-json-rpc.stakely.io",
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
	"0x2329": {
		HeroicNamer: "0x56967F473bb6966f12C42Daf6212e353096797A5",
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
				0x2329: SUPPORTED_NETWORKS["0x2329"].rpc,
			},
		},
	},
};

export const DEFAULT_NETWORK = "0x89"; // Used to switch to if the user is on an unsupported network

export const UI_BREAKPOINTS: Breakpoints = {
	sm: 720,
	md: 1024,
	lg: 1280,
	xl: 1440,
};

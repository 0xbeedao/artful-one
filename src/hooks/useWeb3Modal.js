import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "INVALID_INFURA_KEY";

const NETWORK_NAME = "mainnet";

function useWeb3Modal(config = {}) {
	const [provider, setProvider] = useState(null);
	const [autoLoaded, setAutoLoaded] = useState(false);
	const [web3Modal, setWeb3Modal] = useState(null);
	const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;
	const cachedProvider = web3Modal?.cachedProvider;

	// Web3Modal also supports many other wallets.
	// You can see other options at https://github.com/Web3Modal/web3modal
	useEffect(() => {
		const modal = new Web3Modal({
			network: NETWORK,
			cacheProvider: true,
			providerOptions: {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						infuraId,
					},
				},
			},
		});
		setWeb3Modal(modal);
	}, [NETWORK, infuraId]);

	// Open wallet selection modal.
	const loadWeb3Modal = useCallback(async () => {
		if (web3Modal) {
			const newProvider = await web3Modal.connect();
			setProvider(new Web3Provider(newProvider));
		}
	}, [web3Modal]);

	const logoutOfWeb3Modal = useCallback(
		async function () {
			if (web3Modal) {
				await web3Modal.clearCachedProvider();
				// window?.location.reload();
			}
		},
		[web3Modal],
	);

	// If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
	useEffect(() => {
		if (autoLoad && !autoLoaded && cachedProvider) {
			loadWeb3Modal();
			setAutoLoaded(true);
		}
	}, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, cachedProvider]);

	return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;

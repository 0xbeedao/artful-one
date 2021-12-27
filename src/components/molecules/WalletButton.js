import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiWallet } from 'react-icons/bi';

import { LimitedText } from '../atoms/LimitedText';

export function WalletButton(props) {
	const { provider, loadWeb3Modal, logoutOfWeb3Modal } = props;
	const [userWallet, setUserWallet] = useState();

	useEffect(() => {
		if (provider) {
			provider
				.getSigner()
				.getAddress()
				.then(address => {
					setUserWallet(address);
				});
		}
	}, [provider]);

	const maybeLoadWeb3Modal = () => {
		if (!provider) {
			loadWeb3Modal();
		} else {
			logoutOfWeb3Modal();
		}
	};

	const walletInfo = userWallet
		? userWallet
		: <span>Loading&hellip;</span>;

	const buttonText = !provider
		? "Connect Wallet"
		: <LimitedText maxLength={10} fromEnd={4} text={userWallet || walletInfo} />;

	return (
		<Tooltip label={walletInfo} placement="left">
			<Button onClick={maybeLoadWeb3Modal}>
				<Icon as={BiWallet} mr='.5em' />
				{buttonText}
			</Button>
		</Tooltip>
	);
}

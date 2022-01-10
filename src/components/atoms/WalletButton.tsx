import { Button, Heading, Tooltip } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import { useMemo } from 'react';

import { LimitedText } from './LimitedText';

export default function WalletButton(): JSX.Element {
  const {
    connectWallet,
    isConnecting,
    isConnected,
    disconnect,
    address,
		chainId,
		networks
  } = useWallet();

	let label = 'Connecting ...';
	if (!isConnecting) {
		label = isConnected ? 'Connected' : 'Connect Wallet';
	}

	const tip:string = useMemo(() => {
		const network = networks[chainId] ? networks[chainId].name : 'Unknown';

		if (isConnected) {
			return `Connected to ${network}`;
		}
		return `Connect to ${network}`;
	}, [networks, chainId]);

  return (
    <>
      {!isConnected && (
        <Button
          disabled={isConnecting}
          onClick={() => !isConnected && connectWallet()}
        >
          {label}
        </Button>
      )}
      {isConnected && (
        <>
          <Tooltip label={tip}>
						<Heading fontSize="md" d="inline-block"><LimitedText text={address} maxLength={10} fromEnd={4} /></Heading>
					</Tooltip>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </>
      )}
    </>
  );
};

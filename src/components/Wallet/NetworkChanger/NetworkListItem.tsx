import { ListItem } from '@chakra-ui/react';
import { NetworkConfig } from '@raidguild/quiver';
import React from 'react';

import Network from './Network';

interface NetworkListitemProps {
	chainId: string;
	networks: NetworkConfig;
	onClick: (chainId: string) => void;
	hover?: any;
}

export default function NetworkListItem({chainId, networks, hover, onClick}: NetworkListitemProps): JSX.Element {
	const network = networks[chainId];
	return (
		<ListItem
		 	key={chainId}
			 h="2rem"
			 onClick={() => onClick(chainId)}
		>
			<Network key={chainId} chainId={chainId} color="#FCFCFC" name={network.name} hover={hover} showIcon={false} isOpen={true} />
		</ListItem>
	)

}

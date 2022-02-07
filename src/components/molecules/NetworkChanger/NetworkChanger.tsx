import { Box, Button, List, ListItem, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import React, { useMemo } from 'react';

import Chevron from './Chevron';
import Network from './Network';
import NetworkListItem from './NetworkListItem';

interface NetworkChangerProps {
	right: string;
	top: string;
}

const boxProps = {
	id: 'networkChanger',
	fontSize: 'md',
	width: '10rem',
};

const hover = {
	fontWeight: 500,
	color: 'alttext',
};

export default function NetworkChanger(props: NetworkChangerProps): JSX.Element {
	const { right, top } = props;
	const wallet = useWallet();
	const { isConnected, networks, chainId, switchNetwork } = wallet;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const chain = useMemo(() => {
		if (!isConnected && !chainId) {
			return null;
		}
		return networks[chainId || '-'] || null;
	}, [isConnected, chainId, networks]);

	const networkSelector: JSX.Element = useMemo(() => {
		if (!chain) {
			return (
				<Button variant="outline" {...boxProps} _hover={hover} fontWeight={400}>
					<Text>No Network</Text>
				</Button>
			);
		}

		const safeChainId = chainId || '-';

		const currChain = (
			<Network
				chainId={safeChainId}
				color="#FCFCFC"
				name={chain.name}
				isOpen={isOpen}
				showIcon={true}
				hover={hover}
			/>
		);

		if (!isOpen) {
			return (
				<Button variant="outline" {...boxProps} _hover={hover} onClick={onOpen}>
					{currChain}
				</Button>
			);
		}

		const otherChains = Object
			.keys(networks)
			.filter(chainId => chainId !== safeChainId);

		return (
			<Box {...boxProps}>
				<List textAlign="left" padding="0.5rem 2rem 0">
					<ListItem h="2rem" onClick={onClose}>
						{currChain}
					</ListItem>
					{otherChains.map((otherChainId) => (
						<NetworkListItem
							key={otherChainId}
							chainId={otherChainId}
							networks={networks}
							onClick={(chainId: string) => {
								switchNetwork(chainId);
								onClose();
							}}
						/>
					))}
				</List>
			</Box>
		);
	}, [chain, chainId, isOpen, networks, onClose, onOpen, switchNetwork]);

	return (
		<Box position="relative" width="10rem">
			<Box position="absolute" right={right} top={top}>
				<Box width="10rem" d="inline-block" position="relative">
					<Tooltip label="Click to change network">{networkSelector}</Tooltip>
				</Box>
			</Box>
		</Box>
	);
}

NetworkChanger.defaultProps = {
	right: '0',
	top: '-1.3rem',
};

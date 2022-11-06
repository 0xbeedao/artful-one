import { NftDeployment, NftDeployments } from '@/config/types';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import React, { useMemo } from 'react';

import { OpenSeaLink } from './OpenSeaLink';

interface OpenSeaLinksProps {
	deployments: NftDeployments;
}

export interface OpenSeaLinkProps {
	contract: string;
	tokenIndex: number;
	chainId: string;
	children?: React.ReactNode;
}

export const OPENSEA_URLS: Record<string, string> = {
	'0x89': 'https://opensea.io/assets/matic/',
	'0x13881': 'https://testnets.opensea.io/assets/mumbai',
};

export const OPENSEA_NAMES: Record<string, string> = {
	'0x13881': 'OpenSea Mumbai',
	'0x89': 'OpenSea Polygon'
};

function isTestNetwork(chainId: string): boolean {
	return chainId === '0x13881';
};

const defaultDeployment: NftDeployment = {
	contract: '',
	tokenId: 0,
	name: '',
};

export default function OpenSeaLinkList(props: OpenSeaLinksProps):JSX.Element {
	const { deployments } = props;
	const { chainId } = useWallet();

	const allChains = useMemo(() => deployments ? Object.keys(deployments) : [], [deployments]);
	const activeChains = useMemo(() => isTestNetwork(chainId) ? allChains : allChains.filter(c => !isTestNetwork(c)), [chainId, allChains]);
	const deployment:NftDeployment = useMemo(() => deployments[chainId] ?? defaultDeployment, [deployments, chainId]);

	if (!activeChains ) {
		return <Text>NFS</Text>;
	}

	if (activeChains.length === 1) {
		const chainId = activeChains[0];
		return (
			<OpenSeaLink
				contract={deployment.contract}
				tokenIndex={deployment.tokenId}
				chainId={chainId} />
		);
	}

	return (
		<SimpleGrid>
			{ activeChains.map((chainId) => {
				const { contract, tokenId } = deployments[chainId] ?? defaultDeployment;
				return (
					<OpenSeaLink
						key={`${chainId}/${deployments[chainId]}`}
						contract={contract}
						tokenIndex={tokenId}
						chainId={chainId} />
				);
			})}
		</SimpleGrid>
	);
}

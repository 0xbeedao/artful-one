import { Link, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import React from 'react';

interface OpenSeaLinksProps {
	contracts: Record<string, string> | undefined;
	deployments: Record<string, number> | undefined;
}

interface OpenSeaLinkProps {
	contract: string;
	tokenIndex: number;
	chainId: string;
}

const OPENSEA_URLS: Record<string, string> = {
	'0x89': 'https://opensea.io/assets/matic/',
	'0x13881': 'https://testnets.opensea.io/assets/mumbai',
};

const OPENSEA_NAMES: Record<string, string> = {
	'0x13881': 'OpenSea Mumbai',
	'0x89': 'OpenSea Polygon'
};

function isTestNetwork(chainId: string): boolean {
	return chainId === '0x13881';
};

export function OpenSeaLink(props: OpenSeaLinkProps):JSX.Element {
	const { contract, tokenIndex, chainId } = props;
	const linkColor = useColorModeValue("secondary.700", "secondary.300");
	const url = OPENSEA_URLS[chainId] || 'https://opensea.io/assets';
	const label = OPENSEA_NAMES[chainId] || 'OpenSea';

	return (
			<Link href={`${url}/${contract}/${tokenIndex}`} isExternal fontWeight={700} color={ linkColor }>{ label }</Link>
	);
}

export default function OpenSeaLinks(props: OpenSeaLinksProps):JSX.Element {
	const { contracts, deployments } = props;
	const { chainId } = useWallet();

	const allChains = deployments ? Object.keys(deployments) : [];
	const activeChains = isTestNetwork(chainId) ? allChains : allChains.filter(c => !isTestNetwork(c));

	if (!activeChains || !contracts) {
		return <Text>NFS</Text>;
	}

	if (activeChains.length === 1) {
		const chainId = activeChains[0];
		return (
			<OpenSeaLink
				contract={contracts[chainId]}
				tokenIndex={deployments[chainId]}
				chainId={chainId} />
		);
	}

	return (
		<SimpleGrid>
			{ activeChains.map((chainId) => (
				<OpenSeaLink
					key={`${chainId}/${deployments[chainId]}`}
					contract={contracts[chainId]}
					tokenIndex={deployments[chainId]}
					chainId={chainId} />
			))}
		</SimpleGrid>
	);
}

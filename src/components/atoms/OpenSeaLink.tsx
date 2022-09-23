import { Link, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { OPENSEA_NAMES, OPENSEA_URLS, OpenSeaLinkProps } from './OpenSeaLinkList';

export function OpenSeaLink(props: OpenSeaLinkProps): JSX.Element {
	const { contract, tokenIndex, chainId, children } = props;
	const linkColor = useColorModeValue("secondary.700", "secondary.300");
	const url = OPENSEA_URLS[chainId] ?? 'https://opensea.io/assets';
	const label = children ? children : OPENSEA_NAMES[chainId] ?? 'OpenSea';

	return (
		<Tooltip label={`View on ${OPENSEA_NAMES[chainId] ?? 'OpenSea'}`}>
			<Link href={`${url}/${contract}/${tokenIndex}`} isExternal fontWeight={700} color={linkColor}>{label}</Link>
		</Tooltip>
	);
}

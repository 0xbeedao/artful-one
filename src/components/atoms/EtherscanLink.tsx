import { Link, Tooltip } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import React, { useMemo } from 'react';

import { LimitedText } from './LimitedText';

interface EtherscanLinkProps {
	tx?: string;
	address?: string;
	token?: string;
	maxLength?: number;
	fromEnd?: number;
}

export function EtherscanLink({
	tx = '',
	address = '',
	token = '',
	maxLength = 14,
	fromEnd = 6,
}: EtherscanLinkProps): JSX.Element {
	const { chainId, networks } = useWallet();

	const [href, val] = useMemo(() => {
		let explorer = 'https://etherscan.io';
		let section = 'tx';
		let val = tx;

		if (chainId) {
			const chain = networks[chainId];
			if (chain?.explorer) {
				explorer = chain.explorer;
			} else {
				console.warn('no explorers from chain', chainId);
			}
		}
		if (address) {
			section = 'address';
			val = address;
		} else if (token) {
			section = 'token';
			val = token;
		}

		return [`${explorer}/${section}/${val}`, val];
	}, [address, chainId, networks, token, tx]);

	return (
		<Tooltip label={val}>
			<Link href={href} target="_blank" rel="noopener noreferrer">
				<LimitedText text={val} maxLength={maxLength} fromEnd={fromEnd} />
			</Link>
		</Tooltip>
	);
}

import { Box, Center, VStack } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import React, { useMemo } from 'react';

import HeroicNamer from '../components/SmartContracts/HeroicNamer/HeroicNamer';
import PrimaryTemplate from '../components/templates/Primary';
import { CONTRACTS } from '../config';

// import image from "../public/images/star_1a.jpg";

export default function Home() {
	const { isConnected, chainId } = useWallet();

	const contract: string = useMemo(() => {
		if (isConnected && chainId) {
			return CONTRACTS[chainId].HeroicNamer ?? '';
		}
		return '';
	}, [isConnected, chainId]);

	return (
		<PrimaryTemplate pageKey="home" title="Home">
			<Box width="90%" mt="2rem">
				<Center>
					<HeroicNamer contract={contract} />
				</Center>
			</Box>
		</PrimaryTemplate>
	);
}

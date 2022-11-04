import { Box, Center, List, ListItem, VStack } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import Link from 'next/link';
import React, { useMemo } from 'react';

import PrimaryTemplate from '../components/templates/Primary';

// import image from "../public/images/star_1a.jpg";

export default function ContractsPage() {
	return (
		<PrimaryTemplate pageKey="contracts" title="Art Contracts">
			<Box width="90%" mt="2rem">
				<Center>
					<List>
						<ListItem>
							<span className="styledLink"><Link href="/heroic-namer">Heroic Namer</Link></span> - A contract to find your hero name.
						</ListItem>
					</List>
				</Center>
			</Box>
		</PrimaryTemplate>
	);
}

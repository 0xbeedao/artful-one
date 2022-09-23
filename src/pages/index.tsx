import { Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import Hero from '../components/Art/Hero';
import PrimaryTemplate from '../components/templates/Primary';

// import image from "../public/images/star_1a.jpg";

export default function Home() {
	return (
		<PrimaryTemplate pageKey="home" title="Home">
			<Center>
				<VStack mt="2em">
					<Hero
						height={653}
						width={399}
						image="/art/star_1a.jpg"
						title="Welcome"
						subtitle="Home of my NFT and (sm)Art Contract experiments."
						artTitle="The Star"
						media="Virtual Fresco"
						artist="0xBigBee"
						ctaLink="/heroic-namer"
						ctaText="Heroic Namer"
						alt="Image of the Star"
						slug="-"
					>
						<Text>
							My latest experiment is the Heroic Namer contract.  Give it a try!
						</Text>
					</Hero>
				</VStack>
			</Center>
		</PrimaryTemplate>
	);
}

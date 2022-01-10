import { Center, VStack } from '@chakra-ui/react';
import React from 'react';

import Hero from '../components/organisms/Hero';
import PrimaryTemplate from '../components/templates/Primary';

// import image from "../public/images/star_1a.jpg";

export default function Home() {
	return (
		<PrimaryTemplate pageKey="home" title="Home">
			<Center>
				<VStack mt="2em">
					<Hero
						image="/images/star_1a.jpg"
						title="Welcome"
						subtitle="Home of my NFT and (sm)Art Contract experiments."
						artTitle="The Star"
						media="Virtual Fresco"
						artist="0xBigBee"
					/>
				</VStack>
			</Center>
		</PrimaryTemplate>
	);
}

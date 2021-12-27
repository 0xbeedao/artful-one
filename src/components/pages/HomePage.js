import { Center, VStack } from '@chakra-ui/react';
import React from 'react';

import { Hero } from '../organisms/Hero';

// import FramedArt from '../../molecules/FramedArt';
// <FramedArt src="/images/star_1a.jpg" title="The Star" media="Virtual Fresco" artist="0xBigBee" />

export function HomePage() {
	return (
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
	);
}

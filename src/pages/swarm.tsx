import { Box, Center, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import ArtWithDetail from '../components/organisms/ArtWithDetail';
import StandaloneTemplate from '../components/templates/Standalone';

// import image from "../public/images/star_1a.jpg";

export default function Home() {
	const textColor = useColorModeValue('primary.700', 'primary.300');
	return (
		<StandaloneTemplate pageKey="home" title="Home">
			<Center>
				<VStack mt="2em">
					<ArtWithDetail
						height={432}
						width={640}
						image="/art/swarm-bee.png"
						title="Swarm Bee"
						subtitle="An enhanced illustration"
						artTitle="Swarm Bee"
						media="Multimedia"
						artist="Bruce Kroeze"
						alt="Image of a Bee"
						price={0}
					>
						<Box
							fontSize="md"
							color={textColor}
						>
							<Text mt="1rem">
								This image entered into the “We are Millions Hackathon” was created with assistance
								by a matrix AI function that I wrote over a few months last summer. This was my first real
								success collaborating with AI techniques by first starting with a rough drawing.  I then
								generated a large matrix of options, and rendered hundreds of variations over a few days.

								After selecting my favorites, I further edited and embellished, resulting
								in the final image here, selected for entry for the “Inspiring Art” bounty.

								It's inspiring to me, and hopefully to others by being an example of
								creating something unique that couldn't have been done by my skill alone.
							</Text>
						</Box>
					</ArtWithDetail>
					<Spacer/>
					<Text mt="1rem">
								This art and project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.
								Copyright © 2022 Bruce Kroeze.
							</Text>
				</VStack>
			</Center>
		</StandaloneTemplate>
	);
}

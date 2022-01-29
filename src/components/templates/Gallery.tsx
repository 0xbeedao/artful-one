import { Box, Center, Heading, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';

import PrimaryTemplate from './Primary';

interface GalleryTemplateProps {
	pageKey: string;
	pageTitle: string;
	title: string;
	subtitle: string;
	images: [string, JSX.Element][];
}

export default function GalleryTemplate(props: GalleryTemplateProps): JSX.Element {
	const { pageKey, pageTitle, subtitle, title, images } = props;
	return (
		<PrimaryTemplate pageKey={pageKey} title={pageTitle}>
			<Box padding="1rem 2rem">
				<Center>
					<VStack spacing="1rem">
						<Heading fontSize="xl">{title}</Heading>
						<Heading fontSize="lg" color="primary.400">{subtitle}</Heading>
						<Wrap spacing="30px" mt="1rem" align="center">
							{images.map(([name, image]) => (<WrapItem w="400px" key={ name }>{image} xxxx</WrapItem>))}
						</Wrap>
					</VStack>
				</Center>
			</Box>
		</PrimaryTemplate>
	);
};

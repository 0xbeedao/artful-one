import PrimaryTemplate from '@/components/templates/Primary';
import { Gallery } from '@/config/types';
import { Center, Heading, Link, List, ListItem, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { getGalleries } from 'src/services/content';

export default function ProcessingPage() {
	const galleries = useQuery<Gallery[]>('galleries', getGalleries);

	return (
		<PrimaryTemplate pageKey="home" title="Home">
			<Center pt="1rem">
				<VStack spacing={3}>
					<Heading>Galleries</Heading>
					{ galleries.isLoading && <Text>Loading...</Text> }
					<List>
						{galleries.data?.map((gallery) => (
							<ListItem key={gallery.slug}>
								<Text className="styledLink"><Link href={`/gallery/${gallery.slug}`}>{gallery.name}</Link></Text>
							</ListItem>
						))}
					</List>
				</VStack>
			</Center>
		</PrimaryTemplate>
	);
}

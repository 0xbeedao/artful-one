import FramedArt, { FramedArtProps } from '@/components/Art/FramedArt';
import { ArtPiece, Gallery } from '@/config/types';
import useWindowSize from '@/hooks/useWindowSize';
import { Box, Center, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import Pagination from 'next-pagination';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import FramedNft from '../Art/FramedNft';
import PrimaryTemplate from './Primary';

interface GalleryTemplateProps {
	pageKey: string;
	pageTitle: string;
	title: string;
	subtitle: string;
	gallery: Gallery,
	artPieces: ArtPiece[],
}

export default function GalleryTemplate(props: GalleryTemplateProps): JSX.Element {
	const { pageKey, pageTitle, subtitle, title, gallery, artPieces } = props;
	const { chainId } = useWallet();
	const { query } = useRouter();
	const windowSize = useWindowSize();

	const [columns, sizes]: [number, number[]] = useMemo(() => {
		if (!windowSize) {
			return [2, [2,4,8,16,32]];
		}
		const { width } = windowSize;
		if (width < 1000) {
			return [1, [1,2,4,8,16]];
		}
		if (width < 1800) {
			return [2, [2,4,8,16,32]];
		}
		return [3, [3,6,12,24,48]];
	}, [windowSize]);

	const activePieces = useMemo(() => {
		// default to 2 art pieces, unless we are super wide
		let safe = { page: '1', size: columns === 3 ? '3': '2' };
		if (query) {
			safe = { ...safe, ...query };
		}
		const { page, size } = safe;
		const pageNo = page ? parseInt(page, 10): 1;
		const pageSize = size ? parseInt(size, 10) : 2;
		const start = (pageNo - 1) * pageSize;
		const end = start + pageSize;
		return artPieces.slice(start, end).map((piece) => (
			<FramedNft key={piece.id} {...piece} />
		));
	}, [artPieces, columns, query]);

	return (
		<PrimaryTemplate pageKey={pageKey} title={pageTitle}>
			<Box padding="1rem 2rem">
				<Center>
					<VStack spacing="1rem">
						<Heading fontSize="xl">{title}</Heading>
						<Heading fontSize="lg" color="primary.400" pb="1rem">{subtitle}</Heading>
						 <SimpleGrid
							width="90%"
							spacing={50}
							textAlign="center"
							verticalAlign="top"
							margin="0 auto"columns={columns}
						>
							{activePieces}
						</SimpleGrid>
						<Pagination total={artPieces.length} sizes={sizes} />
					</VStack>
				</Center>
			</Box>
		</PrimaryTemplate>
	);
};

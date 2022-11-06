import { ArtPiece, Gallery, RawNftDeployment } from '@/config/types';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import GalleryTemplate from '../../components/templates/Gallery';
import { getArtForGallery, getDeployments, getGallery, mergeArtPiecesWithDeployments } from '../../services/content';

export default function GalleryPage(): JSX.Element {

	const router = useRouter();
	const { slug } = router.query;

	const artPieces = useQuery<ArtPiece[]>(['art', slug], () => getArtForGallery(slug as string));
	const deployments = useQuery<RawNftDeployment[]>('deployments', getDeployments);
	const gallery = useQuery<Gallery>(['gallery', slug], () => getGallery(slug as string));

	const [pageName, pageDescription] = useMemo(() => {
		if (!gallery.isFetched) {
			return ["Gallery - Loading", "Loading..."];
		}
		return [`Gallery - ${gallery.data.name}`, gallery.data.description];
	}, [gallery]);

	const art: ArtPiece[] = useMemo(() => {
		if (artPieces.isFetched) {
			return deployments.isFetched ? mergeArtPiecesWithDeployments(artPieces.data, deployments.data) : artPieces.data;
		}
		return [];
		}, [artPieces, deployments]);

	return (
		<GalleryTemplate
			pageKey="gallery"
			pageTitle={pageName}
			title={pageName}
			subtitle={pageDescription}
			gallery={gallery.data}
			artPieces={art} />
	);
}

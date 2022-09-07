import { ArtPiece, Gallery, RawNftDeployment } from '@/config/types';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import GalleryTemplate from '../../components/templates/Gallery';
import { getArtForGallery, getDeployments, getGallery, mergeArtPiecesWithDeployments } from '../../services/content';

export default function GalleryPage(): JSX.Element {

	const router = useRouter();
	const { slug } = router.query;

	const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
	const [deployments, setDeployments] = useState<Array<RawNftDeployment>>([]);

	const [gallery, setGallery] = useState<Gallery | null>();

	const [pageName, pageDescription] = useMemo(() => {
		if (!gallery) {
			return ["Gallery - Loading", "Loading..."];
		}
		return [`Gallery - ${gallery.name}`, gallery.description];
	}, [gallery]);

	useEffect(() => {
		getGallery(slug as string).then((gallery) => {
			setGallery(gallery);
		});

		getArtForGallery(slug as string).then((pieces) => {
			setArtPieces(pieces);
			console.log('pieces', pieces);
		});

		getDeployments().then((deployments) => {
			setDeployments(deployments);
			console.log('deployments', deployments);
		});
	}, [slug]);

	const art: ArtPiece[] = useMemo(() => {
		if (artPieces.length > 0 && deployments.length > 0) {
			const a = mergeArtPiecesWithDeployments(artPieces, deployments);
			console.log('pieces, art', artPieces);
			console.log('merged', a);
			return a;
		} else {
			return artPieces;
		}
		}, [artPieces, deployments]);

	return (
		<GalleryTemplate
			pageKey="gallery"
			pageTitle={pageName}
			title={pageName}
			subtitle={pageDescription}
			gallery={gallery}
			artPieces={art} />
	);
}

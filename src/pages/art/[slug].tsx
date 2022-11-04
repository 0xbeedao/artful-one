import { SimpleArtWithDetail } from "@/components/Art/SimpleArtWithDetail";
import PrimaryTemplate from '@/components/templates/Primary';
import type { ArtPiece, ArtProps } from '@/config/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getArtBySlug } from 'src/services/content';

export default function ArtPage(): JSX.Element {

	const router = useRouter();
	const slug = router.query?.slug as string ?? 'not-found';
	const art = useQuery<ArtPiece>(['art', slug], () => getArtBySlug(slug));

	return (
		<PrimaryTemplate pageKey={slug} title={art.isFetched ? art.data.title : 'Loading...'}>
			{art.isFetched && <SimpleArtWithDetail art={art.data} />}
		</PrimaryTemplate>
	);
}

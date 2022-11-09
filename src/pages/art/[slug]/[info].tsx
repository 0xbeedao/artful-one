import { SimpleArtWithDetail } from '@/components/Art/SimpleArtWithDetail';
import PrimaryTemplate from '@/components/templates/Primary';
import { baseUrl } from '@/config/cms';
import { ArtPiece } from '@/config/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getArtBySlug } from 'src/services/content';

import { decodeMap } from '../../../util/smashmap';

export default function ArtPage(): JSX.Element {

	const router = useRouter();
	const { info } = router.query;
	const slug = router.query?.slug as string ?? 'not-found';
	const art = useQuery<ArtPiece>(['art', slug], () => getArtBySlug(slug));

	const data = decodeMap(info as string);
	const { t: title, d: description, i: image } = data;

	const artSection: ArtPiece = useMemo(() => {
		if (art.isFetched) {
			return art.data;
		}
		// return an art piece based on the rehydrated data
		return {
			id: -1,
			deployments: {},
			slug,
			gallery: '',
			title,
			alt: description,
			url: image,
		};
	}, [art.data, art.isFetched, description, image, slug, title]);

	return (
		<PrimaryTemplate pageKey={slug} title={title}>
			<Head>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta name="twitter:title" content={title}></meta>
				<meta name="twitter:description" content={description}></meta>
				<meta name="twitter:image" content={`${baseUrl}${image}`}></meta>
			</Head>
			<SimpleArtWithDetail art={artSection} />
		</PrimaryTemplate>
	);
}

import { SimpleArtWithDetail } from "@/components/Art/SimpleArtWithDetail";
import PrimaryTemplate from '@/components/templates/Primary';
import { baseUrl } from '@/config/cms';
import type { ArtPiece, ArtProps } from '@/config/types';
import Head from "next/head";
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getArtBySlug } from 'src/services/content';

export default function ArtPage(): JSX.Element {

	const router = useRouter();
	const slug = router.query?.slug as string ?? 'not-found';
	const art = useQuery<ArtPiece>(['art', slug], () => getArtBySlug(slug));

	if (!art.isFetched) {
		return (
		<PrimaryTemplate pageKey="art" title="Art - Loading">
			<Head><title>Artful One | Art - Loading</title></Head>
			Loading...
		</PrimaryTemplate>
		);
	}

	return (
		<PrimaryTemplate pageKey={slug} title={art.data.title}>
			<Head>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta name="og:title" content={art.data.title}></meta>
				<meta name="og:description" content={art.data.alt}></meta>
				<meta name="og:image" content={`${baseUrl}${art.data.url}`}></meta>
			</Head>
			{art.isFetched && <SimpleArtWithDetail art={art.data} />}
		</PrimaryTemplate>
	);
}

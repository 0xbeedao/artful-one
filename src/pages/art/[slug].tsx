import { SimpleArtWithDetail } from "@/components/organisms/SimpleArtWithDetail";
import PrimaryTemplate from '@/components/templates/Primary';
import { galleries } from '@/config/art';
import { baseUrl } from '@/config/cms';
import type { ArtPiece, ArtProps } from '@/config/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getArtBySlug } from 'src/services/content';

export default function ArtPage(): JSX.Element {

	const router = useRouter();
	const slug = router.query?.slug as string ?? 'not-found';
	const [art, setArt] = useState<ArtPiece | null>(null);

	useEffect(() => {
		getArtBySlug(slug as string).then(setArt);
	}, [slug]);

	return (
		<PrimaryTemplate pageKey={slug} title={art?.title || 'Loading...'}>
			{art && <SimpleArtWithDetail art={art} />}
		</PrimaryTemplate>
	);
}

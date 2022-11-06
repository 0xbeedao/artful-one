// adapts FramedArt for use with Strapi ArtPiece

import { baseUrl } from '@/config/cms';
import { ArtPiece } from '@/config/types';
import { useMemo } from 'react';

import FramedArt, { FramedArtProps } from './FramedArt';

export default function FramedNft(props: ArtPiece): JSX.Element {
	const { id, title, artist, media, deployments, formats, url, slug } = props;
	const src = useMemo(() => {
		let source = '';
		if (formats?.medium?.url) {
			source = `${baseUrl}${formats.medium.url}`;
		} else if (url) {
			source = `${baseUrl}${url}`;
		}
		console.log(`FramedNft: ${id}, ${source}}`);
		return source;
	}, [formats, id, url]);

	return (
		<FramedArt
			src={src}
			alt={title}
			artist={artist}
			media={media}
			title={title}
			deployments={deployments}
			priced={true}
			slug={slug}
		/>
	);
}

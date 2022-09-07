// adapts FramedArt for use with Strapi ArtPiece

import { baseUrl } from '@/config/cms';
import { ArtPiece } from '@/config/types';

import FramedArt, { FramedArtProps } from './FramedArt';

export default function FramedNft(props: ArtPiece): JSX.Element {
	const { id, title, artist, media, deployments, formats, url, slug } = props;
	let src = '';
	if (formats?.medium?.url) {
		src = `${baseUrl}${formats.medium.url}`;
	} else if (url) {
		src = `${baseUrl}${url}`;
	}
	console.log(`FramedNft: ${id}, ${src}}`);
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

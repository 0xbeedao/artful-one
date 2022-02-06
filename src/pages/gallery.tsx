import { Box } from '@chakra-ui/react';
import React from 'react';

import { FramedArtProps } from '../components/molecules/FramedArt';
import Hero from '../components/organisms/Hero';
import GalleryTemplate from '../components/templates/Gallery';

export default function Gallery(): JSX.Element {
	const images:FramedArtProps[] = [
		{src: "/art/bee-s-e120.jpg", title:"Neon Bee", artist: "0xBigBee", media: "virtual neon"},
		{src: "/art/bee-fancy-wing-0001-scientific-010.jpg", title: "Bee Science Priestess", artist: "0xBigBee", media: "virtual pen"},
		{src: "/art/bee-line-a60.jpg", title: "Bee Study", artist: "0xBigBee", media: "ink"},
		{src: "/art/bee-line-f40.jpg", title: "Inked Bee Study #2", artist: "0xBigBee", media: "ink"},
		{src: "/art/bee-gold-animation.gif", title: "Golden Bee Animation", artist: "0xBigBee", media: "mixed digital"},
		{src: "/art/small-red-bee.jpg", title: "Red Bee", artist: "0xBigBee", media: "mixed digital"},
		{src: "/art/magic-cat-ink.gif", title: "Magic the Cat", artist: "0xBigBee", media: "ink"},
		{src: "/art/eye-swarm.jpg", title: "Eye Swarm", artist: "0xBigBee", media: "mixed digital"},
	];

	return (
		<GalleryTemplate pageKey="gallery" pageTitle="Gallery" title="Main Gallery" subtitle='My favorites' images={images} />
	);
}

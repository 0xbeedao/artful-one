import { Box } from '@chakra-ui/react';
import React from 'react';

import Hero from '../components/organisms/Hero';
import GalleryTemplate from '../components/templates/Gallery';

export default function Gallery(): JSX.Element {
	const images:[string, JSX.Element][] = [
		["i1", <Box key="i1">Image 1</Box>],
		["i2", <Box key="i2">Image 2</Box>],
		["i3", <Box key="i3">Image 3</Box>],
		["i4", <Box key="i4">Image 4</Box>],
	];

	return (
		<GalleryTemplate pageKey="gallery" pageTitle="Gallery" title="Main Gallery" subtitle='My favorites' images={images} />
	);
}

import { galleries } from '@/config/art';
import React from 'react';

import GalleryTemplate from '../components/templates/Gallery';

export default function Gallery(): JSX.Element {

	return (
		<GalleryTemplate pageKey="gallery" pageTitle="Gallery" title="Main Gallery" subtitle='My favorites' gallery={galleries[0]} />
	);
}

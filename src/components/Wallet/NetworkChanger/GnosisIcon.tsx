import { Image } from '@chakra-ui/react';
import React from 'react';

interface GnosisIconProps {
	height: number;
	width: number;
	color: string;
}

export default function GnosisIcon(props: GnosisIconProps) {
	const { height, width } = props;

	return (
		<Image src="/images/rsz_xdai.webp" alt="xdai" width={width} height={height} />
	);
}

import { Image } from '@chakra-ui/react';
import React from 'react';

interface IconProps {
	height: number;
	width: number;
	color: string;
}

export default function GnosisIcon(props: IconProps) {
	const { height, width } = props;

	return (
		<Image src="/images/evmos.webp" alt="Evmos" width={width} height={height} />
	);
}

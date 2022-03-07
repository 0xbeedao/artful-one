import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

import Chevron from './Chevron';
import NetworkIcon from './NetworkIcon';

interface NetworkProps {
	chainId: string;
	color: string;
	name: string;
	isOpen: boolean;
	showIcon: boolean;
	hover?: any;
}

export default function Network(props: NetworkProps): JSX.Element {
	const { chainId, color, hover, name, isOpen, showIcon } = props;
	const cleanName = name.split(' ')[0];

	return (
		<HStack spacing={0.25} cursor="pointer" color="whitish" fontWeight={300} _hover={hover}>
			<NetworkIcon network={chainId} color={color} width={18} height={18} />
			<Text>{cleanName}</Text>
			{showIcon && <Box pl="0.5rem"><Chevron color={color} isOpen={isOpen} /></Box>}
		</HStack>
	);
}

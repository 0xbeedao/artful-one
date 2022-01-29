import { Box, Flex, Icon, IconButton, Spacer, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { GiMoon, GiSun } from 'react-icons/gi';
import { HiAtSymbol } from 'react-icons/hi';
import { RiCopyrightFill } from 'react-icons/ri';

const LightIcon = () => <Icon as={GiSun} />;
const DarkIcon = () => <Icon as={GiMoon} />;
const Copyright = () => <Icon as={RiCopyrightFill} pr="0.35rem" h={5} w={5} verticalAlign="text-top" />;
const AtSymbol = () => <Icon as={HiAtSymbol} pr="0.35rem" h={5} w={5} verticalAlign="text-top" />;

export default function Footer(): JSX.Element {
	const { toggleColorMode } = useColorMode();

	return (
		<Flex p=".5em 1em" backgroundColor={useColorModeValue('primary.200', 'primary.700')}>
			<IconButton
				aria-label="Toggle light/dark mode"
				borderWidth={1}
				onClick={toggleColorMode}
				icon={useColorModeValue(<LightIcon />, <DarkIcon />)}
			/>
			<Spacer />
			<Text fontSize="md" lineHeight="1.5rem" pt="0.25rem" color={useColorModeValue('primary.700', 'primary.200')}>
				<Copyright />
				{new Date().getFullYear()}&nbsp;
				<AtSymbol />
				DevBruce
			</Text>
		</Flex>
	);
}

import { HStack, Icon, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { GiMoon, GiSun } from 'react-icons/gi';

const LightIcon = () => <Icon as={GiSun} />;
const DarkIcon = () => <Icon as={GiMoon} />;

export default function Footer(): JSX.Element {
	const { toggleColorMode } = useColorMode();

	return (
		<HStack p=".5em 1em" backgroundColor={useColorModeValue('primary.200', 'primary.700')}>
			<IconButton
				aria-label="Toggle light/dark mode"
				borderWidth={1}
				onClick={toggleColorMode}
				icon={useColorModeValue(<LightIcon />, <DarkIcon />)}
			/>
		</HStack>
	);
}

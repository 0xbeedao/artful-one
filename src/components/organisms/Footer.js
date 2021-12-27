import { HStack, Icon, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { GiMoon, GiSun } from 'react-icons/gi';

const LightIcon = () => <Icon as={GiSun} alt="Light Mode" />;
const DarkIcon = () => <Icon as={GiMoon} alt="Dark Mode" />;

export default function Footer(props) {
	const { toggleColorMode } = useColorMode();

	return (
		<HStack p=".5em 1em" backgroundColor={useColorModeValue('primary.200', 'primary.700')}>
			<IconButton
				borderWidth={1}
				onClick={toggleColorMode}
				icon={useColorModeValue(<LightIcon />, <DarkIcon />)}
			/>
		</HStack>
	);
}

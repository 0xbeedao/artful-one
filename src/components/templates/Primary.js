import { Box, ChakraProvider, ColorModeScript, Flex, useColorMode } from "@chakra-ui/react";
import Image from 'next/image';
import Link from 'next/link';

import useWeb3Modal from "../../hooks/useWeb3Modal";
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import theme from './theme';

export default function PrimaryTemplate({ pageKey, title, children }) {
	const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
	const { colorMode } = useColorMode();

	return (
		<Box id={pageKey}>
			<Flex minH="100vh" direction="column">
				<Header
					provider={provider}
					loadWeb3Modal={loadWeb3Modal}
					logoutOfWeb3Modal={logoutOfWeb3Modal}
				/>
				<Box flex={1}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<ChakraProvider theme={theme}>
						{children}
					</ChakraProvider>
				</Box>
				<Footer />
			</Flex>
		</Box>
	);
}


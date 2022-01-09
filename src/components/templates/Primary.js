import { Box, Flex } from "@chakra-ui/react";
import Image from 'next/image';
import Link from 'next/link';

import useWeb3Modal from "../../hooks/useWeb3Modal";
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

export default function PrimaryTemplate({ pageKey, title, children }) {
	const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

	return (
		<Box id={pageKey}>
			<Flex minH="100vh" direction="column">
				<Header
					provider={provider}
					loadWeb3Modal={loadWeb3Modal}
					logoutOfWeb3Modal={logoutOfWeb3Modal}
				/>
				<Box flex={1}>
					{children}
				</Box>
				<Footer />
			</Flex>
		</Box>
	);
}


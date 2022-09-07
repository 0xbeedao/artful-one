import { Box, Flex } from "@chakra-ui/react";
import Head from 'next/head';

import Footer from '../site/Footer';
import Header from '../site/Header';

export interface StandaloneTemplateProps {
	pageKey: string,
	title: string,
	children: React.ReactNode
};

export default function StandaloneTemplate({ pageKey, title, children }: StandaloneTemplateProps): JSX.Element {
	return (
		<Box id={pageKey}>
			<Head><title>Artful One | { title }</title></Head>
			<Flex minH="100vh" direction="column">
				<Box flex={1}>
					{children}
				</Box>
			</Flex>
		</Box>
	);
}


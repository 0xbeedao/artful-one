import { Box, Flex } from "@chakra-ui/react";
import Head from 'next/head';

import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

export interface PrimaryTemplateProps {
	pageKey: string,
	title: string,
	children: React.ReactNode
};

export default function PrimaryTemplate({ pageKey, title, children }: PrimaryTemplateProps): JSX.Element {
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


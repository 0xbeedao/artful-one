import useSiteBreakpoint from "@/hooks/useSiteBreakpoint";
import { Box, Flex } from "@chakra-ui/react";
import Head from 'next/head';

import Footer from '../site/Footer';
import Header from '../site/Header';

export interface PrimaryTemplateProps {
	pageKey: string,
	title: string,
	children: React.ReactNode
};

export default function PrimaryTemplate({ pageKey, title, children }: PrimaryTemplateProps): JSX.Element {
	const breakpoint = useSiteBreakpoint();
	return (
		<Box id={pageKey} className={breakpoint}>
			<Head><title>Artful One | { title }</title></Head>
			<Flex minH="100vh" direction="column">
				<Header breakpoint={breakpoint} />
				<Box flex={1}>
					{children}
				</Box>
				<Footer />
			</Flex>
		</Box>
	);
}


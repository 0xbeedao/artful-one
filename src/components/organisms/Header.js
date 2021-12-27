import { HStack, Heading, Icon, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import Image from 'next/image';
import Link from 'next/link';
import { GiCardAceHearts } from 'react-icons/gi';

import { NetworkStatus } from '../molecules/NetworkStatus';
import { WalletButton } from '../molecules/WalletButton';

export function HeaderLink({ href, children, icon }) {
	return (
		<Box pr="1em">
			<Link href={href} passHref={true}>
				<Box>
					<Icon as={icon} mr="0.5em" />
					{children}
				</Box>
			</Link>
		</Box>
	);
}

export default function Header(props) {
	const { provider, loadWeb3Modal, logoutOfWeb3Modal } = props;
	const logo = useColorModeValue('/images/bee-logo-circle.png', '/images/bee-logo-circle-dark.png');
	console.log(`logo: ${logo}`);

	return (
		<Box>
			<Box position="absolute" x={1} y={1}>
				<Image
					className="logo"
					width={80}
					height={80}
					alt="Artful One"
					src={logo}
				/>
			</Box>
			<HStack
				className="header"
			>
				<Link href="/" passHref={true}>
					<HStack h='1.5rem' gap="0.5rem">
						<Heading>
							<Link href="/">Artful One</Link>
						</Heading>
					</HStack>
				</Link>
				<Spacer />
				<HeaderLink href="/gallery">Gallery</HeaderLink>
				<HeaderLink href="/gallery" icon={GiCardAceHearts}>Tarot Dealer</HeaderLink>
				<NetworkStatus provider={provider} />
				<WalletButton
					provider={provider}
					loadWeb3Modal={loadWeb3Modal}
					logoutOfWeb3Modal={logoutOfWeb3Modal}
				/>
			</HStack>
		</Box>);
}

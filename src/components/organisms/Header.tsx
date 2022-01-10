import { HStack, Heading, Icon, Spacer, useColorModeValue } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import Image from 'next/image';
import Link from 'next/link';
import { GiAbstract074, GiCardAceHearts } from 'react-icons/gi';

import WalletButton from '../atoms/WalletButton';

interface HeaderLinkProps {
	href: string;
	icon: any;
	children: React.ReactNode;
};

export function HeaderLink({ href, children, icon }: HeaderLinkProps): JSX.Element {
	return (
		<Box pr="1em" className="headerLink">
			<Link href={href} passHref={true}>
				<Box>
					<Icon as={icon} h="1.5rem" mr="0.5em" verticalAlign="bottom" />
					{children}
				</Box>
			</Link>
		</Box>
	);
}

export default function Header(): JSX.Element {
	const logo = useColorModeValue('/images/bee-logo-circle.png', '/images/bee-logo-circle-dark.png');

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
				spacing='1rem'
			>
				<Link href="/" passHref={true}>
					<HStack h='1.5rem' gap="0.5rem">
						<Heading>
							<Link href="/">Artful One</Link>
						</Heading>
					</HStack>
				</Link>
				<Spacer />
				<HeaderLink href="/gallery" icon={GiAbstract074}>Gallery</HeaderLink>
				<HeaderLink href="/tarot" icon={GiCardAceHearts}>Tarot Dealer</HeaderLink>
				<WalletButton />
			</HStack>
		</Box >);
}

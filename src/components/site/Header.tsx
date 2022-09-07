import { HStack, Heading, Icon, Image, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import { useWallet } from '@raidguild/quiver';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { GiAbstract074, GiCardAceHearts } from 'react-icons/gi';
import { getGalleries } from 'src/services/content';

import type { Gallery } from '../../config/types';
import NetworkChanger from '../Wallet/NetworkChanger/NetworkChanger';
import WalletButton from '../Wallet/WalletButton';

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

// <HeaderLink href="/tarot" icon={GiCardAceHearts}>Tarot Dealer</HeaderLink>

export default function Header(): JSX.Element {
	const logo = useColorModeValue('/images/bee-logo-circle.png', '/images/bee-logo-circle-dark.png');
	const [galleries, setGalleries] = useState<Gallery[]>([]);
	const { address } = useWallet();

	useEffect(() => {
		console.log('Header: useEffect');
		getGalleries().then((galleries) => {
			console.log('galleries', galleries);
			setGalleries(galleries);
		});
	}, []);

	const galleryLinks = useMemo(() => {
		const links = galleries.map(
			(gallery) => <HeaderLink key={gallery.slug} href={`/gallery/${gallery.slug}`} icon={GiAbstract074}>{gallery.name}</HeaderLink>
		);
		console.log(`Links: ${links.length}`);
		return links;
	}, [galleries]);

	return (
		<Box>
			<Box id="logo" position="relative">
				<Image
				 	top={1}
					left={1}
					className="logo"
					width={20}
					height={20}
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
				{ galleryLinks }
				<NetworkChanger />
				<WalletButton />
			</HStack>
		</Box >);
}

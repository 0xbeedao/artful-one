import { HStack, Heading, IconButton, Image, Spacer, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { GiAbstract074, GiBiceps, GiLotus } from 'react-icons/gi';
import { HiOutlineMenu } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { getGalleries } from 'src/services/content';

import type { Gallery } from '../../config/types';
import NetworkChanger from '../Wallet/NetworkChanger/NetworkChanger';
import WalletButton from '../Wallet/WalletButton';
import { HeaderLink } from './HeaderLink';
import { ModalMenu } from './ModalMenu';

interface HeaderProps {
	breakpoint: string;
}

// <HeaderLink href="/tarot" icon={GiCardAceHearts}>Tarot Dealer</HeaderLink>

export default function Header(props: HeaderProps): JSX.Element {
	const { breakpoint } = props;
	const logo = useColorModeValue('/images/bee-logo-circle.png', '/images/bee-logo-circle-dark.png');

	const headerLabelColor = useColorModeValue("secondary.600", "secondary.700");

	const { isOpen, onOpen, onClose } = useDisclosure();

	const galleries = useQuery<Gallery[]>('galleries', getGalleries);

	const galleryLinks = useMemo(() => {
		return !galleries.isFetched
			? []
			: galleries.data.map(
				(gallery) => <HeaderLink key={gallery.slug} href={`/gallery/${gallery.slug}`} icon={GiAbstract074}>{gallery.name}</HeaderLink>
			);
	}, [galleries]);

	const links: JSX.Element[] = useMemo(() => {
		const links: JSX.Element[] = [];
		if (breakpoint === 'lg' || breakpoint === 'xl') {
			links.push(
				<HeaderLink key="lotus" href="/processing/" icon={GiLotus}>Digital Lotus</HeaderLink>,
				<HeaderLink key="heroname" href="/heroic-namer" icon={GiBiceps}>Heroic Name</HeaderLink>
			);
			if (galleryLinks.length > 0) {
				links.push(
					<HeaderLink key="gallery" href="/gallery" icon={GiAbstract074}>Gallery</HeaderLink>,
				);
			}
			links.push(
				<NetworkChanger key="netchanger" />,
			  <WalletButton key="wallet" />
			);
		} else  {
			links.push(
				<WalletButton key="wallet" />,
			);
		}
		links.push(<IconButton key="menu" aria-label="Menu" icon={<HiOutlineMenu />} onClick={onOpen} />);
		return links;
	}, [breakpoint, galleryLinks, onOpen]);


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
				{links}
			</HStack>
			<ModalMenu
				isOpen={isOpen}
				onClose={onClose}
				galleries={galleries.data ?? []}
			/>
		</Box >);
}

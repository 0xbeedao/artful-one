import { Gallery } from '@/config/types';
import {
	Box,
	Center,
	Flex,
	Image,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { GiAbstract074, GiBiceps, GiLotus } from 'react-icons/gi';

import NetworkChanger from '../Wallet/NetworkChanger/NetworkChanger';
import { HeaderLink } from './HeaderLink';

interface ModalMenuProps {
	isOpen: boolean;
	onClose: () => void;
	galleries: Gallery[];
}

const listItemStyle: any = {
	color: 'bodytext',
	fontSize: 'xl',
	mb: '16px',
};

export function ModalMenu({
	isOpen,
	onClose,
	galleries,
}: ModalMenuProps): JSX.Element {
	const grad1 = useColorModeValue("primary.400", "primary.900");
	const grad2 = useColorModeValue("primary.900", "primary.400");
	const textColor = useColorModeValue("secondary.300", "secondary.500");
	const gradient = `linear(180deg, ${grad1} 0%, ${grad2} 100%)`;

	const galleryLinks = useMemo(() => {
		const links = galleries.map(
			(gallery) => <HeaderLink key={gallery.slug} href={`/gallery/${gallery.slug}`} icon={GiAbstract074}>{gallery.name}</HeaderLink>
		);
		console.log(`Links: ${links.length}`);
		return links;
	}, [galleries]);

	const links: JSX.Element[] = useMemo(() => {
		const links: JSX.Element[] = [];
		links.push(
			<Box key="label1">Art Code: </Box>,
			<HeaderLink key="lotus" href="/processing/" icon={GiLotus}>Digital Lotus</HeaderLink>,
			<Box key="label2">Art Contracts: </Box>,
			<HeaderLink key="heroname" href="/heroic-namer" icon={GiBiceps}>Heroic Name</HeaderLink>
		);
		if (galleryLinks.length > 0) {
			links.push(
				<Box key="gallerylabel">Galleries</Box>,
				...galleryLinks,
			);
		}
		links.push(<Box key="changer" pt="1rem"><NetworkChanger /></Box>);
		return links;
	}, [galleryLinks]);

	return (
		<Modal
			size="full"
			blockScrollOnMount={true}
			isOpen={isOpen}
			onClose={onClose}
			preserveScrollBarGap={false}
		>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			></ModalOverlay>
			<ModalContent top="0" bgGradient={gradient}>
				<ModalHeader padding="0">
					<Box className="header" margin="0.5 auto" padding="1rem">
						<Flex>
							<ModalCloseButton top="25px" color={textColor}/>
						</Flex>
					</Box>
				</ModalHeader>
				<ModalBody color={textColor}>
					<Center textAlign="center">
						<VStack>
							{links}
						</VStack>
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

/*
<ListItem>
	<HeaderLink variant="list" page="Portfolio" isActive={pathKey === 'portfolio'} />
</ListItem>
*/

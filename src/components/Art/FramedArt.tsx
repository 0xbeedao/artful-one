import { NftDeployments } from '@/config/types';
import { Box, Image, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import OpenSeaLinkList from '../atoms/OpenSeaLinkList';
import ModalFullscreenImage from './ModalFullscreenImage';

export interface FramedArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	deployments?: NftDeployments;
	priced: boolean;
	slug: string;
}

export default function FramedArt(props: FramedArtProps):JSX.Element {
	const { src, alt, title, artist, media, deployments, priced, slug } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const textColor = useColorModeValue('primary.800', 'primary.200');
	const router = useRouter();

	const handleOpen = useCallback(() => {
		console.log('FramedArt: handleOpen');
		onOpen();
	}, [onOpen]);

	const image = useMemo(() => {
		const artUrl = `/art/${slug}`;
		if (slug && !router.asPath.endsWith(slug)) {
			return (
				<Link href={artUrl} passHref={true}>
					<Image src={src} alt={alt || title} />
				</Link>
			);
		}
		return <Image src={src} alt={alt || title} onClick={handleOpen} />;
	}, [slug, router.asPath, src, alt, title, handleOpen]);

	return (
		<>
			<ModalFullscreenImage isOpen={isOpen} onClose={onClose} alt={alt || title} url={src} />
			<Box className="art">
				<Box className="mat">
					{image}
				</Box>
				<Box className="label">
					<Text color={textColor} className="title">{title}</Text>
					{artist && <Text className="artist">{artist}</Text>}
					{media && <Text className="media">{media}</Text>}
					{priced && (
					<Box color={textColor} className={classnames({ price: true, nfs: (!deployments) })} textAlign="center">
						<OpenSeaLinkList deployments={deployments} />
					</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

FramedArt.defaultProps = {
	priced: true,
};

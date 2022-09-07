import { NftDeployments } from '@/config/types';
import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import OpenSeaLinks from './OpenSeaLinks';

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
	const textColor = useColorModeValue('primary.800', 'primary.200');

	const image = useMemo(() => {
		if (slug) {
			return (
				<Link href={`/art/${slug}`} passHref={true}>
					<Image src={src} alt={alt || title} />
				</Link>
			);
		}
		return <Image src={src} alt={alt || title} />;
	}, [src, alt, title, slug]);

	return (
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
					<OpenSeaLinks deployments={deployments} />
				</Box>
				)}
			</Box>
		</Box>
	);
};

FramedArt.defaultProps = {
	priced: true,
};

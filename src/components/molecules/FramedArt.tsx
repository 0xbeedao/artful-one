import { Box, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import OpenSeaLinks from '../atoms/OpenSeaLinks';

export interface FramedArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	contracts?: Record<string, string>;
	deployments?: Record<string, number>;
}

export default function FramedArt(props: FramedArtProps):JSX.Element {
	const { src, alt, title, artist, media, contracts, deployments } = props;
	const textColor = useColorModeValue('primary.800', 'primary.200');

	console.log(`FramedArt: ${JSON.stringify(contracts)} ${JSON.stringify(deployments)}`);

	return (
		<Box className="art">
			<Box className="mat">
				<Image src={src} alt={alt || title} />
			</Box>
			<Box className="label">
				<Text color={textColor} className="title">{title}</Text>
				{artist && <Text className="artist">{artist}</Text>}
				{media && <Text className="media">{media}</Text>}
				<Box color={textColor} className={classnames({ price: true, nfs: (!deployments) })} textAlign="center">
					<OpenSeaLinks contracts={contracts} deployments={deployments} />
				</Box>
			</Box>
		</Box>
	);
};

FramedArt.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	title: PropTypes.string,
	artist: PropTypes.string,
	media: PropTypes.string,
	price: PropTypes.any
};

FramedArt.defaultProps = {
	price: 'NFS',
};

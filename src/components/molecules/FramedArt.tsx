import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export interface FramedArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	price?: number;
}

export default function FramedArt(props: FramedArtProps):JSX.Element {
	const { src, alt, title, artist, media, price } = props;
	const textColor = useColorModeValue('primary.800', 'primary.200');

	return (
		<Box className="art">
			<Box className="mat">
				<Image src={src} alt={alt || title} />
			</Box>
			<Box className="label">
				<Text color={textColor} className="title">{title}</Text>
				{artist && <Text className="artist">{artist}</Text>}
				{media && <Text className="media">{media}</Text>}
				<Box color={textColor} className={classnames({ price: true, nfs: !price })}>
					{price ? price : "NFS"}
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

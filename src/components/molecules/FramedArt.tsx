import { Box, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useReadContract, useTypedContract } from '@raidguild/quiver';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ArtfulOne, ArtfulOne__factory } from '../../types';

export interface FramedArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	contract?: string;
}

function OpenSeaLink({ contract }: { contract: string}) {
	const linkColor = useColorModeValue("secondary.700", "secondary.300");

	return (
			<Link href={`https://opensea.io/assets/${contract}`} isExternal fontWeight={700} color={ linkColor }>Buy</Link>
	);

}

export default function FramedArt(props: FramedArtProps):JSX.Element {
	const { src, alt, title, artist, media, contract } = props;
	const textColor = useColorModeValue('primary.800', 'primary.200');

	const sale = contract ? <OpenSeaLink contract={contract} /> : "NFS";

	return (
		<Box className="art">
			<Box className="mat">
				<Image src={src} alt={alt || title} />
			</Box>
			<Box className="label">
				<Text color={textColor} className="title">{title}</Text>
				{artist && <Text className="artist">{artist}</Text>}
				{media && <Text className="media">{media}</Text>}
				<Box color={textColor} className={classnames({ price: true, nfs: !contract })}>
					{sale}
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

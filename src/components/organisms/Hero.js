import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import { FramedArt } from "../molecules/FramedArt";

export default function Hero(props) {
	const {
		artTitle,
		title,
		subtitle,
		image,
		ctaLink,
		ctaText,
		alt,
		artist,
		media,
		price,
		...rest
	} = props;
	const textColor = useColorModeValue('primary.800', 'primary.200');

	return (
		<Flex
			align="center"
			justify={{ base: "center", md: "space-around", xl: "space-between" }}
			direction={{ base: "column-reverse", md: "row" }}
			wrap="no-wrap"
			minH="70vh"
			px={8}
			mb={16}
			{...rest}
		>
			<Stack
				spacing={4}
				w={{ base: "80%", md: "40%" }}
				align={["center", "center", "flex-start", "flex-start"]}
			>
				<Heading
					as="h1"
					size="xl"
					fontWeight="bold"
					color={textColor}
					textAlign={["center", "center", "left", "left"]}
				>
					{title}
				</Heading>
				<Heading
					as="h2"
					size="md"
					color={textColor}
					opacity="0.8"
					fontWeight="normal"
					lineHeight={1.5}
					textAlign={["center", "center", "left", "left"]}
				>
					{subtitle}
				</Heading>
				<Link href={ctaLink} passHref={true}>
					<Button
						colorScheme="primary"
						borderRadius="8px"
						py="4"
						px="4"
						lineHeight="1"
						size="md"
					>
						{ctaText}
					</Button>
				</Link>
				<Text
					fontSize="xs"
					mt={2}
					textAlign="center"
					color={textColor}
					opacity="0.6"
				>
				</Text>
			</Stack>
			<Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
				<FramedArt
					src={image}
					alt={alt}
					title={artTitle}
					artist={artist}
					media={media}
					price={price}
				/>
			</Box>
		</Flex>
	);
}

Hero.propTypes = {
	artTitle: PropTypes.string.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.string,
	ctaText: PropTypes.string,
	ctaLink: PropTypes.string,

	alt: PropTypes.string,
	artist: PropTypes.string,
	media: PropTypes.string,
	price: PropTypes.any
};

Hero.defaultProps = {
	title: "Artful One",
	subtitle:
		"Home of my NFT experiments",
	image: "",
	ctaText: "Explore Artful NFTs now",
	ctaLink: "/",
	price: 'NFS',
};

import {
	Box,
	Flex,
	Heading,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

import FramedArt from "./FramedArt";

interface ArtDetailProps {
	artTitle: string;
	title: string;
	subtitle: string;
	image: string;
	alt: string;
	artist: string;
	media: string;
	price?: number;
	height: number;
	width: number;
	children?: JSX.Element;
	slug: string;
}

export default function ArtWithDetail(props: ArtDetailProps) {
	const {
		artTitle,
		title,
		subtitle,
		image,
		alt,
		artist,
		media,
		price,
		children,
		slug = '',
	} = props;
	const textColor = useColorModeValue('primary.700', 'primary.300');

	return (
		<Flex
			align="center"
			justify={{ base: "center", md: "space-around", xl: "space-between" }}
			direction={{ base: "column-reverse", md: "row" }}
			wrap="nowrap"
			minH="70vh"
			px={8}
			mb={16}
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
				{children}
			</Stack>
			<Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
				<FramedArt
					src={image}
					alt={alt}
					title={artTitle}
					artist={artist}
					media={media}
					priced={false}
					slug={slug}
				/>
			</Box>
		</Flex>
	);
}



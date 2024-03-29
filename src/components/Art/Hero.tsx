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
import React from "react";

import FramedArt from "./FramedArt";

interface HeroProps {
	artTitle: string;
	title: string;
	subtitle: string;
	image: string;
	ctaLink: string;
	ctaText: string;
	alt: string;
	artist: string;
	media: string;
	price?: number;
	height: number;
	width: number
	slug: string;
	children?: React.ReactNode;
}

export default function Hero(props: HeroProps) {
	const {
		artTitle,
		children,
		title,
		subtitle,
		image,
		ctaLink,
		ctaText,
		alt,
		artist,
		media,
		price,
		slug,
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
				{ children }
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
					priced={price > 0}
					slug={slug}
				/>
			</Box>
		</Flex>
	);
}


import type { ArtPiece } from "@/config/types";
import { Box, Center, Flex, Heading, Stack, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import ArtWithDetail from "./ArtWithDetail";
import FramedArt from "./FramedArt";
import FramedNft from "./FramedNft";

export interface SimpleArtDetailProps {
	art: ArtPiece;
}

/*
	<ArtWithDetail
			artTitle={art.title}
			title={art.title}
			subtitle=""
			image={art.url}
			alt={art.alt}
			artist={art.artist}
			media={art.media}
			slug={art.slug}
			height={0}
			width={0}>
			{children}
		</ArtWithDetail>

*/

export function SimpleArtWithDetail(props: SimpleArtDetailProps) {
	const { art } = props;
	const textColor = useColorModeValue('primary.700', 'primary.300');

	return (
		<Center>
			<Flex
				justify={{ base: "center", md: "space-around", xl: "space-between" }}
				direction={{ base: "column-reverse", md: "row" }}
				wrap="nowrap"
				minH="70vh"
				px={8}
				m='4rem auto'
			>
				<Box width="auto">
					<FramedNft
						url={art.url}
						alt={art.alt}
						title={art.title}
						artist={art.artist}
						media={art.media}
						slug={art.slug} id={0}
						deployments={art.deployments}
						formats={art.formats}
					/>
				<Box textAlign="center">
					{art.alt}
				</Box>
				</Box>
			</Flex>
		</Center>
	);
}

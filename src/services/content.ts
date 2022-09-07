import type {
	ArtPiece,
	Gallery,
	NftDeployment,
	NftDeployments,
	RawNftDeployment,
} from "@/config/types";
import {
	StrapiClient,
	StrapiPopulatedResponse,
	StrapiUnifiedResponse,
} from "@kmariappan/strapi-client-js";

import { strapi } from "../config/cms";

function toGallery(response: any): Gallery | null {
	if (!response || !response.id) {
		return null;
	}
	return {
		id: response.id,
		name: response.name,
		description: response.description,
		slug: response.slug,
		ordering: response.ordering || 0,
	};
}

export const getGalleries = async () => {
	return strapi
		.from("galleries")
		.select(["name", "description", "slug", "ordering"])
		.sortBy([
			{ field: "ordering", order: "asc" },
			{ field: "name", order: "asc" },
		])
		.get()
		.then((response) => {
			return response.data.map(toGallery);
		});
};

function toArtPiece(response: any): ArtPiece {
	const art: ArtPiece = {
		id: response?.id ?? 0,
		title: response.name,
		alt: response.description,
		artist: response.artist,
		media: response.media,
		formats: response.image.formats,
		url: response.image.url,
		deployments: {},
		slug: response.slug,
	};
	if (response.contracts) {
		response.contracts.forEach((contract) => {
			art.deployments[contract.chain] = {
				tokenId: response.tokenId,
				name: contract.name,
				contract: contract.address,
			};
		});
	}
	console.log("art", art, response);
	return art;
}

export const getArtForGallery = async (slug: string) => {
	return strapi
		.from("art-pieces")
		.select(["name", "artist", "media", "description", "slug"])
		.populate()
		.filterDeep("gallery.slug", "eq", slug)
		.get()
		.then((response) => {
			return response.data.map(toArtPiece);
		});
};

export const getArt = async (id: string) => {
	return strapi
		.from("art-pieces")
		.select(["name", "artist", "media", "description", "slug"])
		.populate()
		.equalTo("id", id)
		.get()
		.then((response) => {
			return toArtPiece(response.data[0]);
		});
};

export const getArtBySlug = async (slug: string) => {
	return strapi
		.from("art-pieces")
		.select(["name", "artist", "media", "description", "slug"])
		.populate()
		.equalTo("slug", slug)
		.get()
		.then((response) => {
			return toArtPiece(response.data[0]);
		});
};

export const getGallery = async (slug: string) => {
	return strapi
		.from("galleries")
		.select(["name", "description", "slug"])
		.equalTo("slug", slug)
		.get()
		.then((response) => {
			return toGallery(response.data[0]);
		});
};

export const getDeployments = async () => {
	return strapi
		.from("deployments")
		.select(["tokenId"])
		.populate()
		.get()
		.then((response) => {
			return response.data.map((raw) => {
				const deployment: RawNftDeployment = {
					contract: raw.contract.address,
					name: raw.contract.name,
					chain: raw.contract.chain,
					tokenId: raw.tokenId,
					artSlug: raw.art_piece.slug,
				};
				return deployment;
			});
		});
};

function rawDeploymentToDeployment(raw: RawNftDeployment): NftDeployment {
	return {
		contract: raw.contract,
		name: raw.name,
		tokenId: raw.tokenId,
	};
}

export function mergeArtPiecesWithDeployments(
	art: ArtPiece[],
	rawDeployments: RawNftDeployment[]
): ArtPiece[] {
	return art.map((artPiece) => {
		const deployments: NftDeployments = {};
		rawDeployments
			.filter((rd) => rd.artSlug === artPiece.slug)
			.forEach((rd) => {
				const deployment = rawDeploymentToDeployment(rd);
				deployments[rd.chain] = deployment;
			});
		return {
			...artPiece,
			deployments,
		};
	});
}

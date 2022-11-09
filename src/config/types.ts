export interface Breakpoints {
	[key: string]: number;
}

export interface NftDeployment {
	contract: string;
	name: string;
	tokenId: number;
}

export interface NftDeployments {
	[chain: string]: NftDeployment;
}

export interface ContractDeployments {
	[contract: string]: string;
}

export interface ChainContractDeployments {
	[chain: string]: ContractDeployments;
}

export interface RawNftDeployment {
	tokenId: number;
	contract: string;
	name: string;
	chain: string;
	artSlug: string;
}

export interface ArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	contract?: string;
	deployments?: NftDeployments;
}

export interface ArtPieceFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: null | string;
	size: number;
	width: number;
	height: number;
}

export interface ArtPieceFormats {
	large: ArtPieceFormat;
	small: ArtPieceFormat;
	medium: ArtPieceFormat;
	thumbnail: ArtPieceFormat;
}

export interface ArtPiece {
	id: number;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	deployments: NftDeployments;
	formats?: ArtPieceFormats;
	url: string;
	slug: string;
	gallery: string;
}

type Metadata = {
	name: string;
	description: string;
	attributes: string;
	image: string;
	external_url: string;
};

export type Nft = {
	path: string;
	filename: string;
	metadata: Metadata;
};

interface DeploymentMap {
	[chain: string]: string;
}

export interface GalleryDeployment {
	imageCid: string;
	metadataCid: DeploymentMap;
	deployments: DeploymentMap;
	pieces: ArtProps[];
}

export type Gallery = {
	id: number;
	name: string;
	description: string;
	ordering: number;
	slug: string;
};

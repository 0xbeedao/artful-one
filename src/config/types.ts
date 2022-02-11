interface NftDeployments {
	[chain: string]: number;  // chain: index
}

export interface ArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	contract?: string;
	deployments?: NftDeployments
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

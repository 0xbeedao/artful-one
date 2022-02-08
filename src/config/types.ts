export interface ArtProps {
	src: string;
	alt?: string;
	title: string;
	artist?: string;
	media?: string;
	contract?: string;
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

export interface GalleryDeployment {
	imageCid: string;
	metadataCid: string;
	pieces: ArtProps[];
}

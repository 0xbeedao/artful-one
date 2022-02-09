import { promises as fs } from 'fs';

import pinataSDK from '@pinata/sdk';
import * as dotenv from "dotenv"; // npm install dotenv

dotenv.config();

const { PINATA_API_SECRET, PINATA_API_KEY } = process.env;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

interface ArtProps {
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

type Nft = {
  path: string;
  filename: string;
  metadata: Metadata;
};

// from running 'deploy-nfts'
const galleryDeployment = {
  IpfsHash: 'bafybeiaqjcc6qrnvnwxsnc3m5uotquyk6wkzzowuvxa52frhijixeloqbe',
  PinSize: 4638914,
  Timestamp: '2022-02-08T02:16:01.752Z'
};

const galleryPieces:ArtProps[] = [
	{src: "/art/bee-s-e120.jpg", title:"Neon Bee", artist: "0xBigBee", media: "virtual neon", contract: "0xBigBee"},
	{src: "/art/bee-fancy-wing-0001-scientific-010.jpg", title: "Bee Science Priestess", artist: "0xBigBee", media: "virtual pen"},
	{src: "/art/bee-line-a60.jpg", title: "Bee Study", artist: "0xBigBee", media: "ink"},
	{src: "/art/bee-line-f40.jpg", title: "Inked Bee Study #2", artist: "0xBigBee", media: "ink"},
	{src: "/art/bee-gold-animation.gif", title: "Golden Bee Animation", artist: "0xBigBee", media: "mixed digital"},
	{src: "/art/small-red-bee.jpg", title: "Red Bee", artist: "0xBigBee", media: "mixed digital"},
	{src: "/art/magic-cat-ink.gif", title: "Magic the Cat", artist: "0xBigBee", media: "ink"},
	{src: "/art/eye-swarm.jpg", title: "Eye Swarm", artist: "0xBigBee", media: "mixed digital"},
];

const makeNfts = (cid: string) => galleryPieces.map(piece => {
	const {
		src,
		title: name,
		artist,
		media,
	} = piece;

	const pathParts = src.split("/");
	const filename = pathParts[pathParts.length - 1];
	const path = src.replace(filename, "");

	return {
		path,
		filename,
		metadata: {
			name,
			description: `${name} by ${artist}, using ${media}`,
			attributes: "",
			image: `https://ipfs.infura.io/ipfs/${cid}${src}`,
			external_url: "https://artful.one/",
		},
	} as Nft;
});

async function uploadAndPinNFTDirectory(directory: string, name:string) {
	console.log("Pinning directory", directory);
	return pinata.pinFromFS(
		directory, {
			pinataMetadata: {name},
			pinataOptions: {
				cidVersion: 1,
				wrapWithDirectory: true,
			},
		});
}

async function main() {
	console.log('=================================================');
	let imageCid = '';
	return uploadAndPinNFTDirectory('art', 'Artful One OG NFT Collection')
		.then(results => {
			console.log('Image Directory Pinned!', results);
			const { IpfsHash } = results;
			imageCid = IpfsHash;
			const nfts = makeNfts(IpfsHash);
			return Promise.all(nfts.map(nft => fs.writeFile(`./metadata/${nft.filename}.json`, JSON.stringify(nft.metadata, null, 2))));
		})
		.then(() => {
			return uploadAndPinNFTDirectory('metadata', 'Artful One OG NFT Collection - Metadata');
		})
		.then(results => {
			console.log('Image Metadata', results);
			const { IpfsHash } = results;
			return fs.writeFile('./src/config/art_latest.ts', `/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { GalleryDeployment } from './types';

export const galleries: GalleryDeployment[] = [
	{
	  imageCid: '${imageCid}',
	  metadataCid: '${IpfsHash}',
	  pieces: ${JSON.stringify(galleryPieces, null, 2)
			.replace(/  /g, '\t')
			.replace(/\n/g, "\n\t\t")},
	}
];
`);
		});
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



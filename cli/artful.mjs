import { basename } from "path";

import { default as StrapiApi } from "@iamsamwen/strapi-api";
import * as dotenv from "dotenv";
import { FormData } from "formdata-node";
import { blobFrom } from "node-fetch";
import { stringify as stringifyQS } from "qs";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";

const yargs = _yargs(hideBin(process.argv));

dotenv.config();

const baseUrl = "https://cms.artful.one";

const strapi = new StrapiApi({
	base_url: baseUrl,
	api_token: process.env.STRAPI_RW_TOKEN,
	page_size: 100,
});

// Slugify a string
function slugify(str) {
	str = str.replace(/^\s+|\s+$/g, "");

	// Make the string lowercase
	str = str.toLowerCase();

	// Remove accents, swap ñ for n, etc
	var from =
		"ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
	var to =
		"AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}

	// Remove invalid chars
	str = str
		.replace(/[^a-z0-9 -]/g, "")
		// Collapse whitespace and replace by -
		.replace(/\s+/g, "-")
		// Collapse dashes
		.replace(/-+/g, "-");

	return str;
}

async function addNFTCommand(args) {
	const { file, name, description, price, gallery } = args;
	const gallerySearch = {
		filters: {
			slug: {
				$eq: gallery,
			},
		},
	};
	const result = await strapi.get_ids("/api/galleries", gallerySearch);
	if (!result.length) {
		console.error("Gallery not found");
		return false;
	}
	const galleryId = result[0];

	console.log("Uploading file...", name);

	const uploadResult = await strapi.upload_file(file, {
		path: `${gallery}_images`,
		name: name,
		caption: description,
	});
	if (!uploadResult) {
		console.error("Upload failed");
	}
	const fileId = uploadResult[0].id;

	const createResult = await strapi.post("/api/art-pieces", {
		data: {
			name,
			artist: "DevBruce",
			media: "Digital",
			image: fileId,
			gallery: galleryId,
			slug: slugify(name),
			description,
		},
	});
	console.log(createResult);
}

function nftBuilder(yargs) {
	return yargs
		.positional("file", {
			type: "string",
			description: "NFT file",
		})
		.option("name", {
			alias: "n",
			type: "string",
			description: "NFT name",
		})
		.option("gallery", {
			alias: "g",
			type: "string",
			required: true,
			description: "Gallery slug (must exist)",
		})
		.option("description", {
			alias: "d",
			type: "string",
			description: "NFT description",
		})
		.option("price", {
			alias: "p",
			type: "string",
			description: "NFT price",
		});
}

yargs
	.command({
		command: "addNFT <file>",
		desc: "Add a new NFT",
		builder: nftBuilder,
		handler: addNFTCommand,
	})
	.help()
	.parse();

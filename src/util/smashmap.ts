import { compress, decompress } from "@remusao/smaz";
import { fromByteArray, toByteArray } from "base64-js";

const DELIM = "\0";

export function encodeMap(data: { [key: string]: string }): string {
	const raw = Object.keys(data)
		.map((key) => `${key}=${data[key]}`)
		.join(DELIM);
	return fromByteArray(compress(raw)).replace(/\+/g, "-").replace(/\//g, "_");
}

export function decodeMap(data: string): { [key: string]: string } {
	if (!data) {
		console.error("decodeMap: data is falsy");
		return {};
	}
	const raw = decompress(
		toByteArray(data.replace(/-/g, "+").replace(/_/g, "/"))
	);
	const map = {};
	raw.split(DELIM).forEach((pair) => {
		const [key, value] = pair.split("=");
		map[key] = value;
	});
	return map;
}

import {
	StrapiClientOptions,
	createClient,
} from "@kmariappan/strapi-client-js";

export const baseUrl = "https://cms.artful.one";

const options: StrapiClientOptions = {
	url: `${baseUrl}/api`,
	apiToken: "",
	normalizeData: true,
	headers: {},
	persistSession: false,
};

export const strapi = createClient(options);

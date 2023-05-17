module.exports = {
	reactStrictMode: true,
	eslint: {
		dirs: ["pages", "components", "utils", "config"],
	},
	experimental: {
		outputStandalone: true,
	},
	async headers() {
		return [
			{
				// matching all processing js files
				source: "/lib/processing/*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "https://openprocessing.org",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};

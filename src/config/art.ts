import { ArtProps, GalleryDeployment } from './types';

export const galleries: GalleryDeployment[] = [
	{
	  imageCid: 'bafybeiaqjcc6qrnvnwxsnc3m5uotquyk6wkzzowuvxa52frhijixeloqbe',
	  metadataCid: {
			"0x89": "bafybeihmsjacnlmffd7763qy4bbwhqnsam3grwmtbf5c5v2amxmelw6wrq",
			"0x13881": "bafybeiazjlqz2z7lx2lluhreuujgxv3hou7z2gowcn4omypja6w4zjl5bi",
		},
		deployments: {
			"0x89": "0xbEFB257a2875bc7Db12C869Fe4E9c4aa4953225E",
			"0x13881": '0xBdb6677e2de8fc3F61fd5D1Bba8DC0cd51B57641',
    },
	  pieces: [
			{
				"src": "/art/bee-s-e120.jpg",
				"title": "Neon Bee",
				"artist": "0xBigBee",
				"media": "virtual neon",
				deployments: {
					"0x13881": 4,
					"0x89": 4,
				},
			},
			{
				"src": "/art/bee-fancy-wing-0001-scientific-010.jpg",
				"title": "Bee Science Priestess",
				"artist": "0xBigBee",
				"media": "virtual pen",
				deployments: {
					"0x13881": 1,
					"0x89": 1,
				},
			},
			{
				"src": "/art/bee-line-a60.jpg",
				"title": "Bee Study",
				"artist": "0xBigBee",
				"media": "ink",
				deployments: {
					"0x13881": 0,
					"0x89": 0,
				}
			},
			{
				"src": "/art/bee-line-f40.jpg",
				"title": "Inked Bee Study #2",
				"artist": "0xBigBee",
				"media": "ink",
				deployments: {
					"0x13881": 3,
					"0x89": 3,
				},
			},
			{
				"src": "/art/bee-gold-animation.gif",
				"title": "Golden Bee Animation",
				"artist": "0xBigBee",
				"media": "mixed digital",
				deployments: {
					"0x13881": 2,
					"0x89": 2,
				},
			},
			{
				"src": "/art/small-red-bee.jpg",
				"title": "Red Bee",
				"artist": "0xBigBee",
				"media": "mixed digital",
				deployments: {
					"0x13881": 7,
					"0x89": 7,
				},
			},
			{
				"src": "/art/magic-cat-ink.gif",
				"title": "Magic the Cat",
				"artist": "0xBigBee",
				"media": "ink",
				deployments: {
					"0x13881": 6,
					"0x89": 6,
				},
			},
			{
				"src": "/art/eye-swarm.jpg",
				"title": "Eye Swarm",
				"artist": "0xBigBee",
				"media": "mixed digital",
				deployments: {
					"0x13881": 5,
					"0x89": 5,
				},
			}
		],
	}
];

import { getNetworkInfo } from './chains';

export const chains = {};
// here are our target chains, by ID
[43114, 1, 3, 1666600000, 137, 100].forEach(chain => {
	const info = getNetworkInfo(chain);
	// console.log(`Info ${chain} = ${JSON.stringify(info)}`);
	chains[chain] = info;
});

// console.log('chains', chains);

export const getChainInfo = getNetworkInfo;

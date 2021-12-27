import live from './live.json';
import test from './test.json';

// networks where ens exists
const ens = ['1', '3', '4'];
export const all = [...live, ...test];

export function getNetworkInfo(id) {
	if (id === null) {
		return {
			name: "Not Connected",
			"nativeCurrency": {
				"name": "Unknown", "symbol": "???", "decimals": 18
			}
		};
	}
	const chain = all.find(c => c.chainId === id) || {
		"name": "Unknown",
		"chainId": id,
		"shortName": "unk",
		"chain": "???",
		"network": "unk",
		"networkId": `${id}`,
		"nativeCurrency": { "name": "Unknown", "symbol": "???", "decimals": 18 },
		"rpc": [],
		"faucets": [],
		"explorers": [],
	};
	return {
		...chain,
		ens: hasEns(id)
	};
}

// if this net has ens
export function hasEns(id) {
	return ens.includes(id);
}

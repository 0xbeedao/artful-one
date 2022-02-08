require('dotenv').config();
require('@typechain/hardhat');
require("@nomiclabs/hardhat-waffle");

const PK = process.env.DEV_WALLET = process.env.DEV_WALLET || '0x0';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		compilers: [
			{
				version: '0.8.11',
			}
		]
	},
	typechain: {
		outDir: './src/types',
	}
	/* 	networks: {
			'matic_testnet': {
				url: "https://rpc-mumbai.maticvigil.com",
				accounts: [PK],
				gasPrice: 8000000000
			}
		} */
};

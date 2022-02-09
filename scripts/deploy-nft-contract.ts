var { ArtfulOne__factory } = require("@/types/");
var { ethers } = require("ethers");

const contractCID = 'bafybeiazjlqz2z7lx2lluhreuujgxv3hou7z2gowcn4omypja6w4zjl5bi';
const targetChain = 'mumbai';

// NETWORK CONFIGURATION
const networks = {
	cronos_testnet: {
  	url: "https://cronos-testnet-3.crypto.org:8545",
  	gasPriceGWei: 5000,
  	blockExplorerPrefix: "https://cronos.crypto.org/explorer/testnet3/tx/",
	},
	mumbai: {
		url: "https://rpc-mumbai.maticvigil.com",
		gasPriceGWei: 8000,
		blockExplorerPrefix: "https://mumbai.polygonscan.com/tx/",
	},
	cronos: {
		url: "https://evm-cronos.crypto.org/",
  	gasPriceGWei: 5000,
		blockExplorerPrefix: "https://cronoscan.com/tx/",
	},
	rinkeby: {
		url:
    "https://eth-rinkeby.alchemyapi.io/v2/" +
    <string>process.env["ALCHEMY_KEY"],
		gasPriceGWei: 2,
	  blockExplorerPrefix: "https://rinkeby.etherscan.io/tx/",
	},
};

const network = networks[targetChain];

async function deploy(contractCID: string): Promise<string> {
  // Deployment configuration variables
  const name = "ArtfulOne";
  const symbol = "BEE";
  const baseURI = `https://ipfs.io/${contractCID}/metadata/`;
  const endpoint = network.url;
  const gasPrice = network.gasPriceGWei * 1000000000;
  const signingKey = <string>process.env["DEV_WALLET"];
  // Deploy smart contract
  const ethersProvider = new ethers.providers.JsonRpcProvider(endpoint);
  const fromWallet = new ethers.Wallet(signingKey);
  const fromSigner = fromWallet.connect(ethersProvider);
  const contractAbi = ArtfulOne__factory.abi;
  const contractBytecode = ArtfulOne__factory.bytecode;
  const ethersFactory = new ethers.ContractFactory(
    contractAbi,
    contractBytecode,
    fromSigner
  );
  const deployTx = await ethersFactory.deploy(name, symbol, baseURI, {
    gasPrice: gasPrice,
  });
  console.log("Pending transaction", deployTx.deployTransaction);
  await deployTx.deployTransaction.wait();
  console.log(
    "Contract deployment transaction hash",
    deployTx.deployTransaction.hash
  );
  console.log("Contract address", deployTx.address);
  console.log(
    "Block explorer URL",
    network.blockExplorerPrefix + deployTx.deployTransaction.hash
  );
  return deployTx.address;
}


async function main() {
	const deployAddress = await deploy(contractCID);
	console.log('Deployed to:', deployAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



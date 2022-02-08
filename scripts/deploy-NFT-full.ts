// To run this script locally
// npx ts-node ./scripts/deploy-NFT-full.ts

import { ethers } from "ethers";

import axios from "axios"; // npm install axios
import fs from "fs";
import prompt from "prompt";
import { create as createIPFSClient } from "ipfs-http-client";
import util from "util";
import stream from "stream";
import { nfts } from "../src/config/art";

import * as dotenv from "dotenv"; // npm install dotenv
dotenv.config();

import { ArtfulOne__factory } from "../src/types";

const ipfsPost = axios.create({
	baseURL: "https://api.pinata.cloud/data/",
	headers: {
		"pinata_api_key": <string>process.env["PINATA_API_KEY"],
		"pinata_secret_api_key": <string>process.env["PINATA_SECRET_API_KEY"],
		"Content-Type": "multipart/form-data",
	},
});

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

async function main() {
  prompt.start();
  let userInput = "";
  //
  // Upload token level metadata to IPFS and create contractURI
  //
  console.log("=================================================");
  console.log("Uploading contract level metadata to IPFS now...");
  console.log("=================================================");
  const contractCID = await uploadContractLevelMetadata();
  userInput = <string>(await prompt.get(["ConfirmToProceed"])).ConfirmToProceed;
  //
  // Upload NFTs to IPFS and create tokenURIs
  //
  console.log("=================================================");
  console.log("Uploading token data to IPFS now...");
  console.log("=================================================");
  const tokenCIDs = [];
  for (let i = 0; i < 3; i++) {
    let uri = "";
    uri = await uploadNFTtoIPFS(i);
    tokenCIDs.push(uri);
  }
  console.log("Token CIDs", tokenCIDs);
  userInput = <string>(await prompt.get(["ConfirmToProceed"])).ConfirmToProceed;
  //
  // Optional:
  // Check the Token CIDs
  // This will display data associated with the Token CIDs
  // and save the images in the artifacts/downloads directory
  //
  console.log("=================================================");
  console.log("Checking uploaded data now..");
  console.log("=================================================");
/*   await checkTokenCIDs(tokenCIDs);
  console.log(
    "The images have been downloaded to the ./artifacts/downloads directory"
  );
  userInput = <string>(await prompt.get(["ConfirmToProceed"])).ConfirmToProceed;
 */
  //
  //
  console.log("=================================================");
  console.log("Deploying smart contract now...");
  console.log("=================================================");
  const contractAddress = await deploy(contractCID);
  console.log(
    "CHECK IN BLOCK EXPLORER THAT THE TRANSACTION IS COMPLETE BEFORE PROCEEDING"
  );
  userInput = <string>(await prompt.get(["ConfirmToProceed"])).ConfirmToProceed;

  //
  //
  console.log("=================================================");
  console.log("Minting NFTs now...");
  console.log("Contract address", contractAddress);
  console.log("=================================================");
  await mint(contractAddress, tokenCIDs);
  console.log(
    "CHECK IN BLOCK EXPLORER THAT THE TRANSACTION IS COMPLETE BEFORE PROCEEDING"
  );
  userInput = <string>(await prompt.get(["ConfirmToProceed"])).ConfirmToProceed;
  //
  //
  console.log("=================================================");
  console.log("Checking contents of smart contract now...");
  console.log("=================================================");
  await read(contractAddress);
}

const ipfsUrlPrefix = "https://ipfs.io/ipfs/";
// const ipfsUrlPrefix = "ipfs://";

// Script to upload contract-level metadata to IPFS
// then returns the CID of the contract-level metadata JSON
async function uploadContractLevelMetadata(): Promise<string> {
  // Create metadata
  const metadata = {
    name: "Artful One Collection",
    description: "My collection on the " + targetChain + " blockchain",
    image:
      "https://ipfs.io/ipfs/QmUdRhMLKEcBdGc2rqps2uX79Hv5rX5MYEEWJnRBeZH4i1?filename=bee-logo-circle.png",
    external_link: "https://artful.one",
    seller_fee_basis_points: 1000,
    fee_recipient: "0x180fDB959eEaA76d72bDdd2cfBB9553320E64D7f",
  };
  console.log("Metadata", metadata);
  // Upload metadata
  const ipfsClient = createIPFSClient({
    url: "https://api.pinata.cloud/data/",
    headers: {
			"pinata_api_key": <string>process.env["PINATA_API_KEY"],
			"pinata_secret_api_key": <string>process.env["PINATA_SECRET_API_KEY"],
		}
  });
  const file_metadata = {
    path: "/art/contract_metadata.json",
    content: JSON.stringify(metadata),
  };
  const cid_metadata = (await ipfsClient.add(file_metadata)).cid;
  console.log("Metadata CID (folder)", cid_metadata);
  // Pin metadata
	const filename = `${cid_metadata}/contract_metadata.json`;
	const formData = new FormData();
	formData.append("file", filename);
  const pinResponse = await ipfsPost.post(
		"pinning/pinFileToIPFS",
		formData
	);
  console.log("Metadata pin response", pinResponse.data);
  // Return CID
  return filename;
}

// Script to upload the NFT image to IPFS,
// then create the MetaData JSON and upload it to IPFS
// then return the CID o fhe token's metadata JSON
async function uploadNFTtoIPFS(id: number): Promise<string> {
  const nft = nfts[id];
  console.log("NFT", nft.metadata.name);
  const ipfsClient = createIPFSClient({
    url: "https://api.pinata.cloud/data/",
    headers: {
			"pinata_api_key": <string>process.env["PINATA_API_KEY"],
			"pinata_secret_api_key": <string>process.env["PINATA_SECRET_API_KEY"],
		}
  });
  // First let's upload the image
  const file_image = {
    path: "/art/" + nft.filename,
    content: fs.readFileSync(nft.path + nft.filename),
  };
  const cid_image = (await ipfsClient.add(file_image)).cid;
  console.log("Image CID (folder)", cid_image);
  // Pin the image in Pinata, this will make it more persistent
  // than your average IPFS data
	const filename = `${cid_image}/${nft.filename}`;
	const formData = new FormData();
	formData.append("file", filename);
  const pinResponse = await ipfsPost.post(
		"pinning/pinFileToIPFS",
		formData
	);
  console.log("Image pin response", pinResponse.data);
  // Then let's update the metadata
  const newMetadata = {
    ...nft.metadata,
    image: ipfsUrlPrefix + filename
  };
  console.log("Metadata", newMetadata);
  // Let's upload the metadata
  const file_metadata = {
    path: "/art/" + nft.filename + ".json",
    content: JSON.stringify(newMetadata),
  };
  const cid_metadata = (await ipfsClient.add(file_metadata)).cid;
  console.log("Metadata CID (folder)", cid_metadata);
  // Pin the image in Infura
	const formData2 = new FormData();
	formData2.append("file", filename + ".json");
  const pinResponse2 = await ipfsPost.post(
		"pinning/pinFileToIPFS",
		formData
	);
  console.log("Metadata pin response", pinResponse2.data);
  // Return the Token URI
  console.log("Token URI", ipfsUrlPrefix + cid_metadata);
  return cid_metadata + "/" + nft.filename + ".json";
}

// Optional function to read the Metadata from IPFS
// and check it
async function checkTokenCIDs(cids: string[]) {
  for (let i = 0; i < cids.length; i++) {
    console.log("For i =", i);
    // Read metadata
    const readResponse_metadata = await axios.request<any>({
      url: "https://ipfs.infura.io:5001/api/v0/cat?arg=" + cids[i],
      auth: {
        username: <string>process.env["INFURA_IPFS_PROJECT_ID"],
        password: <string>process.env["INFURA_IPFS_SECRET"],
      },
    });
    const metadata: any = readResponse_metadata.data;
    console.log("Metadata", metadata);
    // Download the image and save it in downloads
    const cid_image = metadata.image.replace("https://ipfs.io/ipfs/", "");
    console.log("Image CID", cid_image);
    const pipeline = util.promisify(stream.pipeline);
    const readResponse = await axios.request<any>({
      url: "https://ipfs.infura.io:5001/api/v0/cat?arg=" + cid_image,
      auth: {
        username: <string>process.env["INFURA_IPFS_PROJECT_ID"],
        password: <string>process.env["INFURA_IPFS_SECRET"],
      },
      responseType: "stream",
    });
    await pipeline(
      readResponse.data,
      fs.createWriteStream("./artifacts/downloads/img" + i)
    );
  }
}

async function deploy(contractCID: string): Promise<string> {
  // Deployment configuration variables
  const name = "ArtfulOne";
  const symbol = "BEE";
  const baseURI = "https://ipfs.io/" + contractCID;
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

async function mint(contractAddress: string, tokenCIDs: string[]) {
  // Transaction configuration variables
  const recipients = [];
  const tokenURIs = [];
  for (let i = 0; i < tokenCIDs.length; i++) {
    recipients.push(<string>process.env["OWNER_ADDRESS"]);
    tokenURIs.push("ipfs://" + tokenCIDs[i]);
  }
  console.log("Batch mint parameters", recipients, tokenURIs);
  const endpoint = network.url;
  const gasPrice = network.gasPriceGWei * 1000000000;
  const signingKey = <string>process.env["OWNER_PRIVATE_KEY"];
  // Execute transaction
  const ethersProvider = new ethers.providers.JsonRpcProvider(endpoint);
  const fromWallet = new ethers.Wallet(signingKey);
  const fromSigner = fromWallet.connect(ethersProvider);
  const contractAbi = ArtfulOne__factory.abi;
  const readContractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    ethersProvider
  );
  const writeContractInstance = readContractInstance.connect(fromSigner);
  const pendingTx = await writeContractInstance["mintBatchWithURI"](
    recipients,
    tokenURIs,
    {
      gasPrice: gasPrice,
    }
  );
  console.log("Pending transaction hash", pendingTx.hash);
  console.log(
    "Block explorer URL",
    network.blockExplorerPrefix + pendingTx.hash
  );
}

async function read(contractAddress: string) {
  // Chain variables
  const endpoint = network.url;
  // Read smart contract
  const ethersProvider = new ethers.providers.JsonRpcProvider(endpoint);
  const contractAbi = ArtfulOne__factory.abi;
  const readContractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    ethersProvider
  );
  console.log("Name", await readContractInstance["name"]());
  console.log("Symbol", await readContractInstance["symbol"]());
  console.log("Contract URI", await readContractInstance["contractURI"]());
  console.log("Owner of contract", await readContractInstance["owner"]());
  console.log("Owner of Token 0", await readContractInstance["ownerOf"](0));
  console.log("URI of Token 0", await readContractInstance["tokenURI"](0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

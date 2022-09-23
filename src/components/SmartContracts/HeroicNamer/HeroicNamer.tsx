import { EtherscanLink } from '@/components/atoms/EtherscanLink';
import { HeroicNamer__factory } from '@/types/factories/contracts';
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useReadContract, useTypedContract, useWallet, useWriteContract } from '@raidguild/quiver';
import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import HeroicNameList from './HeroicNameList';
import { HeroicName } from './types';

interface HeroicNamerProps {
	contract: string;
}

const handleError = (error: Error): void => {
	console.error(error);
};

const handleResponse = (response: ContractTransaction): void => {
	console.log('response', response);
	toast.success("Transaction sent");
};

const handleConfirmation = (confirmation: ContractReceipt): void => {
	console.log('Confirmation', confirmation);
	toast.success("Transaction confirmed");
};

export default function HeroicNamer(props: HeroicNamerProps): JSX.Element {
	const { address, isConnected, networks, chainId } = useWallet();
	const [waiting, setWaiting] = useState(false);
	const { contract } = props;
	const [ names, setNames ] = useState<HeroicName[]>([]);
	const [ listening, setListening ] = useState(false);

	console.log(`contract: ${contract}`);
	const {contract: namerContract} = useTypedContract(contract, HeroicNamer__factory);

	const { response: mintPrice } = useReadContract(namerContract, 'price', [], {
		autoUpdateInterval: 300000,
	});

	const { mutate: mint } = useWriteContract(namerContract, "mint", {
		onError: handleError,
		onResponse: handleResponse,
		onConfirmation: handleConfirmation,
	});

	const [price, priceWithToken] = useMemo(() => {
		if (mintPrice && chainId) {
			const price = formatEther(mintPrice);
			const token = networks[chainId].symbol;
			return [mintPrice, `${price} ${token}`];
		}
		return [BigNumber.from(0), '0'];
	}, [mintPrice, networks, chainId]);

	const handleMint = async (): Promise<void> => {
		setWaiting(true);
		try {
			const result: any = await mint({value: parseEther('0.001')});
			console.log(`mint result: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error(error);
		} finally {
			setWaiting(false);
		}
	};

	const handleNameEvent = useCallback((name: string, tokenId: BigNumber, owner: string) => {
		if (address === owner) {
			console.log(`HeroicName: ${owner}[${tokenId.toHexString()}] ${name}`);
			setNames((names) => [...names, {name, tokenId: tokenId.toNumber()}]);
			toast.success( `You have a new Heroic Name: ${name}`);
		}
	}, [address]);

	useEffect(() => {
		if (namerContract && isConnected && !listening) {
			namerContract.on('HeroicName', handleNameEvent);
			setListening(true);
		}
		return () => {
			if (namerContract && listening) {
				namerContract.off('HeroicName', handleNameEvent);
			}
		};
	}, [namerContract, isConnected, handleNameEvent, listening]);

	const nameList = useMemo(() => {
		return listening
			? <HeroicNameList address={address} contract={namerContract} names={names} chainId={chainId} />
			: <Text>Waiting for connection...</Text>;
	}, [listening, address, namerContract, names, chainId]);

	return (
		<Flex marginLeft="2rem">
			<VStack marginRight="2rem" textAlign="left" align="left" maxWidth="60%">
				<Text as="h2" fontSize="1.75rem">The Heroic Namer</Text>
				<Text>
					This smart contract will mint a Heroic Name for you.
					It is an NFT (ERC721) token, so you can trade it, sell it, or give it away.
				</Text>
				<Text>
					I have deployed this to Evmos, Polygon and Polygon Testnet - so you can give it a try before you commit to the real deal.
					To switch, just change your network, and refresh the page.  It will automatically use the right contract.
				</Text>
				<Text></Text>
				<Text>
					Feel free to take a look at the contract:&nbsp;
					<EtherscanLink address={contract} />
				</Text>
				<Box>
					<Button disabled={contract && !isConnected && !waiting} onClick={handleMint}>{ waiting ? "Minting!" : "Make Hero Name!"}</Button>
					{price && price.gt(0) && <Text>Price: {priceWithToken}</Text>}
				</Box>
			</VStack>
			{nameList}
		</Flex>
	);
}

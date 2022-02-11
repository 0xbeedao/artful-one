import { Box, Text } from '@chakra-ui/react';
import { useTypedContract, useWallet, useWriteContract } from '@raidguild/quiver';
import React, { useMemo, useState } from 'react';

import { TarotNFTDeck__factory } from '../../types';

interface CardDealerProps {
	contract: string;
}

export default function CardDealer(props: CardDealerProps): JSX.Element {
	const { address, isConnected } = useWallet();
	const [waiting, setWaiting] = useState(false);
	const { contract } = props;

	const dealerContract = useTypedContract(contract, TarotNFTDeck__factory);

	const handleError = (error: Error): void => {
		console.error(error);
	};

	const handleResponse = (response: any): void => {
		console.log(response);
	};

	const handleConfirmation = (): void => {
		console.log('Confirmation');
	};

	const { mutate: dealCard } = useWriteContract(dealerContract.contract, "dealCard", {
		onError: handleError,
		onResponse: handleResponse,
		onConfirmation: handleConfirmation,
	});

	const handleDeal = async (): Promise<void> => {
		setWaiting(true);
		try {
			await dealCard();
		} catch (error) {
			console.error(error);
		} finally {
			setWaiting(false);
		}

	}

	return (
		<Box>
			<Text>{address}</Text>
			<Text>{isConnected}</Text>
		</Box>
	);
}

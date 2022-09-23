import { callbackify } from 'util';

import { HeroicNamer } from '@/types/contracts';
import { Button, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react';
import { useWriteContract } from '@raidguild/quiver';
import { ContractReceipt, ContractTransaction } from 'ethers';
import React, { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';

export type NftDeleterProps = {
	address: string;
	contract: HeroicNamer;
	tokenIndex: number;
	onDeleted: (number) => void;
};

const handleError = (error: Error): void => {
	console.error(error);
};

const handleResponse = (response: ContractTransaction): void => {
	console.log('response', response);
	toast.success("Delete request sent");
};

function NftDeleter(props: NftDeleterProps): JSX.Element {
	const { address, contract, onDeleted, tokenIndex } = props;
	const [ isDeleting, setIsDeleting ] = React.useState(false);

	const handleConfirmation = useCallback((confirmation: ContractReceipt): void => {
		console.log('Confirmation', confirmation);
		toast.success("Heroic Name deleted");
		onDeleted(tokenIndex);
		setIsDeleting(false);
	}, [onDeleted, tokenIndex]);

	const { mutate: burn } = useWriteContract(contract, "burn", {
		onError: handleError,
		onResponse: handleResponse,
		onConfirmation: handleConfirmation,
	});

	const linkColor = useColorModeValue("secondary.700", "secondary.300");

	const handleDelete = useCallback(async () => {
		setIsDeleting(true);
		console.log(`Deleting tokenId ${tokenIndex} from ${address}`);
		await burn(tokenIndex);
	}, [address, burn, tokenIndex]);

return (
	<Popover>
		<PopoverTrigger>
			<IconButton aria-label="Delete" size="xs" ml="1rem" icon={<AiOutlineDelete color={linkColor} />} />
		</PopoverTrigger>
		<PopoverContent>
			<PopoverArrow />
			<PopoverCloseButton />
			<PopoverHeader>Confirm</PopoverHeader>
			<PopoverBody>
				<Text>Delete this name permanently?</Text>
				<Button disabled={isDeleting} onClick={handleDelete}>{isDeleting ? "Deleting..." : "Delete"}</Button>
			</PopoverBody>
		</PopoverContent>
	</Popover>
);

}

export default NftDeleter;

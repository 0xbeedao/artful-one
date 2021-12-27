import { Select, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { chains } from '../../config';

async function requestNetwork(chainId) {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId }], // chainId must be in hexadecimal numbers
	});
}

const requestNetworkChangeAndNotify = async (id, setNetwork, toast, tries = 1) => {
	const info = chains[id];
	const hexAddress = `0x${parseInt(id, 10).toString(16)}`;

	try {
		requestNetwork(hexAddress);
		setNetwork(info);
		if (!toast.isActive(id)) {
			toast({
				id,
				title: `Connected to ${info.name}`,
				status: 'success',
				duration: 1000,
				isClosable: true,
			});
		}
	} catch (error) {
		// This error code indicates that the chain has not been added to MetaMask
		// if it is not, then install it into the user MetaMask
		if (error.code === 4902) {
			const rpcUrl = info.rpc.length > 0 ? info.rpc[0] : '';
			try {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [{ chainId: hexAddress, rpcUrl }]
				});
				if (tries < 2) {
					requestNetworkChangeAndNotify(id, setNetwork, toast, 2);
				}
			} catch (addError) {
				console.error(addError);
				toast({
					title: "Error",
					description: addError.message,
					status: "error",
					isClosable: true
				});
			}
		} else {
			console.error(error);
		}
	}
};

const ChainOption = ({ chain }) => <option value={chain.chainId}>{chain.name}</option>;
ChainOption.propTypes = {
	chain: PropTypes.object.isRequired,
};

export const NetworkStatus = (props) => {
	const { provider } = props;
	const [network, setNetwork] = useState();
	const toast = useToast();
	const chainId = network ? network.chainId : '';

	useEffect(() => {
		if (provider) {
			provider.getNetwork().then((net) => {
				setNetwork(net);
				if (!toast.isActive(net.chainId)) {
					console.log('toast!');
					toast({
						id: net.chainId,
						title: `Connected to ${net.name}`,
						status: 'success',
						duration: 2000,
						isClosable: true,
						position: 'top'
					});
				}
			});
		}
	}, [provider, toast]);

	const handleChange = (evt) => {
		const { target: { value } } = evt;
		requestNetworkChangeAndNotify(value, setNetwork, toast, 1);
	};

	const options = Object.values(chains).map((c) => <ChainOption chain={c} key={c.chainId} />);

	return (
		<Select placeholder="Select Net" colorScheme="green" value={chainId} w="9em" onChange={handleChange}>
			{options}
		</Select>
	);
};

NetworkStatus.propTypes = {
	provider: PropTypes.object,
};

NetworkStatus.defaultProps = {
	provider: null,
};

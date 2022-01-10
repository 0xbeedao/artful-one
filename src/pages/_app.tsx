import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { WalletProvider } from '@raidguild/quiver';
import { Toaster, toast } from "react-hot-toast";

import { DEFAULT_NETWORK, PROVIDER_OPTIONS, SUPPORTED_NETWORKS } from '../config';
import theme from '../config/theme';

function MyApp({ Component, pageProps }) {

	const web3ModalOptions = {
		cacheProvider: true,
		providerOptions: PROVIDER_OPTIONS,
		theme: theme.config.initialColorMode,
	};

	return (
		<>
			<Toaster
				position="top-center"
				toastOptions={{ duration: 3000 }}
			/>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<WalletProvider
				networks={SUPPORTED_NETWORKS}
				defaultNetwork={DEFAULT_NETWORK}
				web3modalOptions={web3ModalOptions}
				handleModalEvents={(eventName, error) => {
					if (error) {
						toast.error(error.message);
					}

					console.log(eventName);
				}}
				>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />;
				</ChakraProvider>
			</WalletProvider>
		</>
	);
}

export default MyApp;

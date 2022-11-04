import 'next-pagination/dist/index.css';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { WalletProvider } from '@raidguild/quiver';
import { Toaster, toast } from "react-hot-toast";
import {
   QueryClient,
   QueryClientProvider,
} from 'react-query';

import { DEFAULT_NETWORK, PROVIDER_OPTIONS, SUPPORTED_NETWORKS } from '../config';
import theme from '../config/theme';

function ArtfulApp({ Component, pageProps }) {

	const web3ModalOptions = {
		cacheProvider: true,
		providerOptions: PROVIDER_OPTIONS,
		theme: theme.config.initialColorMode,
	};

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 20, // 20 seconds
			}
		}
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster
				position="top-center"
				toastOptions={{ duration: 3000 }}
			/>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<WalletProvider
				networks={SUPPORTED_NETWORKS}
				defaultChainId={DEFAULT_NETWORK}
				web3modalOptions={web3ModalOptions}
				handleModalEvents={(eventName, error) => {
					if (error) {
						toast.error(error.message);
					}

					console.log(eventName);
				}}
				>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</WalletProvider>
		</QueryClientProvider>
	);
}

export default ArtfulApp;

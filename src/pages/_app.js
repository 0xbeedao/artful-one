import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '../config/theme';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ChakraProvider theme={theme}></ChakraProvider>
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;

import PrimaryTemplate from '@/components/templates/Primary';
import { Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useWindowSize } from 'usehooks-ts';

export default function ProcessingPage() {
	const { width, height } = useWindowSize();

	return (
		<PrimaryTemplate pageKey="home" title="Home">
			<Center>
			<iframe
				src="https://openprocessing.org/sketch/1335485/embed/?plusEmbedHash=MDZiNTgxZDQxZGU5Y2M2MmU0ODNiODdiZjBhZWNjZWY3N2ZmYzUwNzUyZmEyNTAzNWM5YTcyNThhZjg0MWE1MjBkMTQxN2E4NzgxNmIwNjIyZTBiMjc0OTE5OTViODY4MzU1NWQwNTFjODMyYmRjZTZkYmE3YTdkMzJhMTYzZGFSOHVOOEQ3M2diYnM0UWxBR3NGS3ptOFZOWVpRY0U2SzZ2dUhHTlg4YXdvbkdDMlNyZmJlY201Ylo0NHFTTlFGYkhxVEZOb1ZaM0g1NVAyQTZ2ekN0dz09&plusEmbedTitle=true"
				width={width-100}
				height={height-100}></iframe>
			</Center>
		</PrimaryTemplate>
	);
}

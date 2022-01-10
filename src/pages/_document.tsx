import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="description" content="Artful projects, beautiful things, code and such." />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Esteban&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200&display=swap" rel="stylesheet" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

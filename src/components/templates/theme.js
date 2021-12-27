import { extendTheme } from "@chakra-ui/react";

const config = {
	colors: {
		primary: {
			50: '#eef0fd',
			100: '#d0d3e4',
			200: '#b2b8cc',
			300: '#9399b7',
			400: '#7579a2',
			500: '#5c5c89',
			600: '#49486b',
			700: '#37334d',
			800: '#201d30',
			900: '#0b0716',
		}
	},
	initialColorMode: "dark",
	useSystemColorMode: false,
	styles: {
		global: (props) => ({
			"*": {
				fontFamily: "'Esteban', serif"
			},
			".PageContent": {
				"flex": 1,
			},
			"code": {
				fontFamily: "'Source Code Pro', monospace"
			},
			".logo": {
				position: 'absolute',
				top: 1,
				left: 1,
			},
			".header": {
				bgColor: props.colorMode === 'light' ? "primary.200" : "primary.700",
				justify: true,
				padding: ".5em 1em .5em 90px",
				borderBottom: "2px solid primary.900",
				"button": {
					fontWeight: 'normal',
				},
				"h2": {
					fontWeight: 'normal',
				},
			},
			".mat img": {
				boxSizing: "border-box",
				width: "100%; height: auto",
				display: "block",
				padding: "10%",
				backgroundColor: props.colorMode === 'light' ? "#b0a990" : "primary.500",
				backgroundImage: "url(/images/plaster.jpg)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				border: "6px double #635c51",
				boxShadow: "0 0 0 50px rgba(244,240,236,0.4) inset, 0 0 0 11px #202030, 0 0 30px rgba(0,0,0,0.8) inset",
				outline: "2px solid #333",
				outlineOffset: "0px",
			},
			".art .label": {
				boxSizing: "border-box",
				margin: "2em auto 4em",
				height: "auto",
				display: "block",
				width: "66%",
				padding: ".5em",
				backgroundImage: props.colorMode === 'light' ? "url(/images/textured-canvas.jpg)" : "",
				backgroundColor: "primary.600",
				backgroundSize: "cover",
				backgroundRepeat: "repeat",
				boxShadow: props.colorMode === 'light' ? "5px 5px 10px #635c51, 0 0 10px #635c51" :
					"5px 5px 10px #444, 0 0 10px #444",
				".title": {
					fontSize: "18px",
					fontWeight: "bold",
				},
				".media": {
					lineHeight: "1.2em",
					fontSize: "16px",
				},
				".artist": {
					lineHeight: "1.2em",
					fontSize: "16px",
				},
				".price": {
					lineHeight: "1.2em",
					fontSize: "18px",
				},
			}
		}),
	}
};

const theme = extendTheme(config);

export default theme;

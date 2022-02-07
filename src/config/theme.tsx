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
		},
		secondary: {
			100: '#F3E5F5',
			200: '#EAD26E',
			300: '#E1BEE7',
			400: '#D8295F',
			500: '#CE93D8',
			600: '#A86732',
			700: '#823A8C',
			800: '#5A9DE3',
			900: '#33013A',
		}
	},
	initialColorMode: "light",
	useSystemColorMode: false,
	components: {
		Button: {
			baseStyle: {
				fontWeight: 'bold',
				borderRadius: '.2em',
				backgroundColor: 'primary.500',
				borderWidth: '0',
			},
			sizes: {
				sm: {
					fontSize: 'sm',
					px: 3,
					py: 2,
				},
				md: {
					fontSize: 'md',
					px: 5,
					py: 3,
				},
			},
			variants: {
				primary: {
					color: 'white',
					border: '2px solid #755df2',
				},
			},
			defaultProps: {
				size: 'md',
				variant: 'primary',
			},
		},
	},
	fonts: {
		heading: 'Esteban',
		body: 'Esteban',
		code: 'Source Code Pro',
	},
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
				bgColor: props.colorMode === 'dark' ? "primary.100" : "primary.900",
				color: props.colorMode === 'dark' ? "primary.800" : "primary.200",
				justify: true,
				padding: ".5em 1em .5em 90px",
				borderBottom: "2px solid primary.900",
				"button": {
					fontWeight: 'normal',
				},
				"h2": {
					fontWeight: '600',
					_hover: {
						color: props.colorMode === 'dark' ? "secondary.500" : "primary.500",
					}
				},
				".faded": {
					color: props.colorMode === 'dark' ? "primary.300" : "primary.600",
				},
				".headerLink": {
					cursor: "pointer",
					_hover: {
						color: props.colorMode === 'dark' ? "secondary.500" : "primary.500",
					},
				},
				"#networkChanger": {
					borderRadius: "md",
					color: props.colorMode !== 'dark' ? "primary.100" : "primary.900",
					bgColor: props.colorMode !== 'dark' ? "primary.800" : "primary.200",
					borderColor: props.colorMode === 'dark' ? "primary.300" : "primary.600",
					".chevron": {
						color: props.colorMode !== 'dark' ? "primary.100" : "primary.900"
					},
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
			},
		}),
	}
};

const theme = extendTheme(config);

export default theme;

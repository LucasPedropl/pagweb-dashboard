import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./index.html',
		'./App.tsx',
		'./src/**/*.{ts,tsx,js,jsx}',
		'./components/**/*.{ts,tsx,js,jsx}',
		'./pages/**/*.{ts,tsx,js,jsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;

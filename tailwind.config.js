/** @type { import('tailwindcss').Config } */

export default {
	content: ['./index.html', './src/**/*.{js,vue}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Space Grotesk', 'sans-serif'],
			},
		},
	},
	darkMode: 'class',
	plugins: [],
}

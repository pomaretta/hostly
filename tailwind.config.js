module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("daisyui"),
	],
	daisyui: {
		themes: [
			{
				hostly: {
					primary: "#00b6d7"
				}
			}
		]
	}
}
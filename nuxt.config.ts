import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	vite: {
		plugins: [tailwindcss()],
	},
	css: ['~/assets/css/main.css'],
	ui: {
		colorMode: false,
	},
	ssr: false,
	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/ui',
		'@pinia/nuxt',
	],
	runtimeConfig: {
		public: {
			apiUrl: process.env.NUXT_PUBLIC_API_URL,
			apiNoPrefix: process.env.NUXT_PUBLIC_API_URL_NO_PREFIX,
		},
	},
	fonts: {
		families: [{ name: 'Noto Sans ', provider: 'google' }],
	},
})

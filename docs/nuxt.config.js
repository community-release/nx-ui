import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import viteRawPlugin from 'vite-raw-plugin';
import ui from './ui.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTION_BASE_PATH = '';

const { version } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	server: {
		port: 7012,
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en-EN',
			},
			titleTemplate: '%s - UI components',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					hid: 'description',
					name: 'description',
					content: 'Nuxt3 template description',
				},
				{
					hid: 'viewport',
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
				},
				{ name: 'msapplication-TileColor', content: '#ffffff' },
				{ name: 'theme-color', content: '#ffffff' },
			],
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: PRODUCTION_BASE_PATH + '/favicon.ico',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: PRODUCTION_BASE_PATH + '/favicon-32.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: PRODUCTION_BASE_PATH + '/favicon-16.png',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '512x512',
					href: PRODUCTION_BASE_PATH + '/favicon-512.png',
				},

				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap&subset=cyrillic',
				},
				{
					rel: 'stylesheet',
					href: 'https://use.fontawesome.com/releases/v5.13.0/css/all.css',
					crossorigin: 'anonymous',
				},
			],
		},
	},

	css: ['~/assets/styles/index.less'],

	vite: {
		css: {
			preprocessorOptions: {
				less: {
					// Import less variables, mixins or styles that will be awailable in every templates without additional import
					additionalData: '@import "@/assets/styles/global.less";',
				},
			},
		},
		plugins: [
			viteRawPlugin({
				fileRegex: /\.vue?raw$/
			})
		]
	},

	telemetry: false,

	nitro: {
		prerender: {
			failOnError: false
		},
		output: {
			publicDir: path.join(__dirname, '../.output')
		}
	},

	modules: [
		// 'nuxt-shiki',
		'@unocss/nuxt',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'../src/module',
		[
			'@nuxtjs/color-mode',
			{
				preference: 'light',
				classPrefix: 'theme-',
				classSuffix: '',
			},
		],
	],

	runtimeConfig: {
		version
	},

	shiki: {
		bundledLangs: ['vue', 'javascript'],
		defaultTheme: 'github-dark',
		defaultLang: 'vue',
	},

	i18n: {
		compilation: {
			strictMessage: false,
		},

		lazy: true,
		locale: 'en',
		defaultLocale: 'en',
		fallbackLocale: 'en',
		compilation: {
			strictMessage: false,
		},
		detectBrowserLanguage: false, // https://i18n.nuxtjs.org/docs/guide/browser-language-detection
		locales: [
			{
				code: 'en',
				file: 'en.json'
			},
		],
	},

	ui,
	compatibilityDate: '2024-07-03'
});
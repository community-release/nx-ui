import { defineNuxtConfig } from 'nuxt/config';
import MyModule from '../../../src/module';

export default defineNuxtConfig({
	ssr: true,
	modules: [
		MyModule
	]
})
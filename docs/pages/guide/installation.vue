<template>
	<section>
		<section-title>Installation</section-title>

		<helper-typography>
			<h3>Install package</h3>
			<Shiki lang="bash" :code="installCode" />

			<h3>Add module</h3>
			<p>Add module to <code>nuxt.config</code>:</p>
			<Shiki lang="javascript" :code="configCode" />

			<p>
				Components are available in templates with the <code>ui-</code> prefix,
				see <nuxt-link-locale to="/guide/configuration">configuration</nuxt-link-locale> for module options.
			</p>
		</helper-typography>
	</section>
</template>

<script setup>
const { t } = useI18n();

const installCode = 'pnpm add @community-release/nx-ui';

const configCode = `export default defineNuxtConfig({
	modules: [
		'@community-release/nx-ui',
	],
});`;

useHead({
	title: t('breadcrumbs.installation')
});
</script>

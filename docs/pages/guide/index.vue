<template>
	<section>
		<section-title>Introduction</section-title>

		<helper-typography>
			<p>
				<strong>@community-release/nx-ui</strong> is a Nuxt module with UI components for Nuxt 3/4 applications.
				Components are registered with the <code>ui-</code> prefix, for example <code>ui-button</code>
				or <code>ui-select</code>.
			</p>
			<p>Library is in development and not ready for production use yet.</p>

			<h3>Features</h3>
			<ul>
				<li>Colors, sizes, spacing and fonts are CSS variables that can be changed in config</li>
				<li>Default props of components can be changed for the whole project</li>
				<li>Components are imported only where they are used</li>
			</ul>

			<h3>Next steps</h3>
			<ul>
				<li><nuxt-link-locale to="/guide/installation">Install</nuxt-link-locale> the module</li>
				<li><nuxt-link-locale to="/guide/configuration">Configure</nuxt-link-locale> colors and default props</li>
				<li>Browse <nuxt-link-locale to="/components">components</nuxt-link-locale></li>
			</ul>
		</helper-typography>
	</section>
</template>

<script setup>
const { t } = useI18n();

useHead({
	title: t('breadcrumbs.introduction')
});
</script>

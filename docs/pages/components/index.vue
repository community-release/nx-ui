<template>
	<section id="page-components">
		<ui-grid grid-template-columns="repeat(3, 1fr)" gap="var(--space-default)">
			<nuxt-link-locale v-for="item of components" class="component" :to="item.url">
				ui-{{ item.name }}
			</nuxt-link-locale>
		</ui-grid>
	</section>
</template>

<script setup>
import components from '~/assets/components.json';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.components')
});
</script>

<style lang="less">
#page-components {
	.component {
		padding: var(--space-default);

		font-weight: bold;
		color: var(--color-header-text);

		border-radius: var(--border-radius);
		background: var(--color-surface);
	}
}
</style>
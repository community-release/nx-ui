<template>
	<section>
		<helper-typography>
			<h1>@community-release/nx-ui</h1>

			<p>
				Highly customizible, responsive & accessible web UI for your Nuxt 3/4 application.
			</p>
		</helper-typography>

		<div class="block-control pt-4">
			<ui-button href="/components">View component</ui-button>
		</div>
	</section>
</template>

<script setup>
const { t } = useI18n();

useHead({
	title: t('breadcrumbs.index')
});
</script>

<style lang="less">

</style>
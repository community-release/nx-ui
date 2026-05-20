<template>
	<section class="component-section-title">
		<slot />
	</section>
</template>

<style lang="less">
.component-section-title {
	padding-bottom: var(--space-xl);

	font-weight: bold;
	font-size: var(--text-xl);
	color: var(--color-header-text);
}
</style>
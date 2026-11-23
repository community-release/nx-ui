<template>
	<section class="component-section-title">
		<slot />
	</section>
</template>

<style lang="less">
.component-section-title {
	padding-bottom: var(--space-xl);

	font-weight: bold;
	font-size: var(--text-2xl);
	line-height: 1.2;
	color: var(--color-header-text);
}
</style>
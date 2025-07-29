<template>
	<section id="layout-default">
		<bar-top />

		<div id="wrapper" :class="{'tag-with-menu': $currentPage.value !== 'index'}">
			<aside v-if="$currentPage.value !== 'index'" >
				<menu-aside />
			</aside>

			<main>
				<helper-breadcrumbs v-if="$currentPage.value !== 'index'" />
				<div class="page">
					<slot />
				</div>
			</main>
		</div>
	</section>
</template>

<script>
export default {
	name: 'layout-default'
}
</script>

<style lang="less">
#layout-default {

	#wrapper {
		margin: 0 auto;
		padding: var(--space-default);
		max-width: var(--content-width);

		&.tag-with-menu {
			display: grid;
			grid-template-columns: 300px auto;
			gap: var(--space-big);
		}
	}

	aside {

	}

	main {
		overflow-x: hidden;
	}

	.page {
		margin-top: var(--space-big);
	}
}

@media only screen and (max-width: 950px) {
	#layout-default #wrapper {
		grid-template-columns: 1fr;
	}
}
</style>
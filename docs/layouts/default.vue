<template>
	<section id="layout-default">
		<bar-top />

		<div id="wrapper" :class="{'tag-with-menu': $currentPage.value !== 'index'}">
			<aside v-if="$currentPage.value !== 'index'" class="aside-menu">
				<menu-aside />
			</aside>

			<main>
				<helper-breadcrumbs v-if="$currentPage.value !== 'index'" />
				<div class="page">
					<slot />
				</div>
			</main>

			<aside v-if="$currentPage.value !== 'index'" class="aside-toc">
				<menu-page-toc />
			</aside>
		</div>

		<bar-footer />
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
		padding: var(--space-m);
		max-width: var(--content-width);

		&.tag-with-menu {
			display: grid;
			grid-template-columns: 240px minmax(0, 1fr) 220px;
			gap: var(--space-xl);
		}
	}

	.aside-menu,
	.aside-toc {
		position: sticky;
		top: var(--space-m);
		align-self: start;
		overflow-y: auto;
		max-height: calc(100vh - var(--space-m) * 2);
	}

	.aside-toc {
		padding-top: calc(var(--space-xl) + 1.7em);
	}

	main {
		overflow-x: hidden;
	}

	.page {
		margin-top: var(--space-xl);
	}
}

@media only screen and (max-width: 1200px) {
	#layout-default #wrapper.tag-with-menu {
		grid-template-columns: 220px minmax(0, 1fr);

		.aside-toc {
			display: none;
		}
	}
}

@media only screen and (max-width: 950px) {
	#layout-default #wrapper.tag-with-menu {
		grid-template-columns: minmax(0, 1fr);

		.aside-menu {
			position: static;
			max-height: none;
		}
	}
}
</style>

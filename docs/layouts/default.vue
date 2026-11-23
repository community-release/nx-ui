<template>
	<section id="layout-default">
		<bar-top />

		<div id="wrapper" :class="{'tag-with-menu': hasMenu}">
			<aside v-if="hasMenu" class="aside-menu">
				<div class="aside-menu-inner">
					<menu-aside />
				</div>
			</aside>

			<div class="container">
				<main>
					<helper-breadcrumbs v-if="hasMenu" />
					<div class="page">
						<slot />
						<component-api v-if="componentName" :name="componentName" />
					</div>
					<page-pager v-if="hasMenu" />
				</main>

				<aside v-if="hasMenu" class="aside-toc">
					<menu-page-toc />
				</aside>
			</div>
		</div>
	</section>
</template>

<script setup>
const { $currentPage } = useNuxtApp();

// Data
const hasMenu = computed(() => $currentPage.value !== 'index');

// Component name on component pages, e.g. "components-button" -> "button"
const componentName = computed(() => {
	const match = $currentPage.value.match(/^components-(.+)$/);

	return match ? match[1] : '';
});
</script>

<style lang="less">
#layout-default {

	#wrapper {
		&.tag-with-menu {
			display: grid;
			grid-template-columns: var(--aside-width) minmax(0, 1fr);
		}
	}

	.aside-menu {
		border-right: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.aside-menu-inner {
		position: sticky;
		top: 0;
		overflow-y: auto;
		max-height: 100vh;
		padding: var(--space-l);
	}

	.container {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-2xl);
		margin: 0 auto;
		padding: var(--space-xl) var(--space-2xl) var(--space-3xl);
		width: 100%;
		max-width: calc(var(--content-width) - var(--aside-width));
	}

	.tag-with-menu .container {
		grid-template-columns: minmax(0, 1fr) 220px;
	}

	.aside-toc {
		position: sticky;
		top: var(--space-xl);
		align-self: start;
		overflow-y: auto;
		max-height: calc(100vh - var(--space-xl) * 2);
	}

	main {
		min-width: 0;
	}

	.page {
		margin-top: var(--space-l);

		// Section headings divider
		h2,
		h3 {
			padding-top: var(--space-xl);
			border-top: 1px solid var(--color-border);
		}

		// Code blocks outside of examples, Shiki renders <pre><code class="shiki">
		.g-typography pre {
			margin: var(--space-s) 0;
		}

		.g-typography pre > code.shiki {
			display: block;
			overflow: auto;
			padding: var(--space-m);
			font-family: var(--font-mono);
			font-size: var(--text-s);
			line-height: 1.6;
			tab-size: 4;
			border-radius: var(--border-radius);
		}
	}
}

@media only screen and (max-width: 1200px) {
	#layout-default {
		.tag-with-menu .container {
			grid-template-columns: minmax(0, 1fr);
		}

		.aside-toc {
			display: none;
		}
	}
}

@media only screen and (max-width: 950px) {
	#layout-default {
		#wrapper.tag-with-menu {
			grid-template-columns: minmax(0, 1fr);
		}

		.aside-menu {
			border-right: 0;
			border-bottom: 1px solid var(--color-border);
		}

		.aside-menu-inner {
			position: static;
			max-height: none;
		}

		.container {
			padding: var(--space-l) var(--space-m) var(--space-2xl);
		}
	}
}
</style>

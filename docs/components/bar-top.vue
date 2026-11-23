<template>
	<header class="component-bar-top">
		<nuxt-link-locale :to="'/'" class="brand">
			<span class="logo"></span>
		</nuxt-link-locale>

		<div class="bar">
			<helper-search />

			<div class="bar-right">
				<nav class="menu">
					<nuxt-link-locale class="item" v-for="item in menuMain" :key="item.id" :to="'/' + item.id">
						{{ $t(item.text) }}
					</nuxt-link-locale>
				</nav>

				<span class="version">v{{ config.public.version }}</span>

				<span class="divider"></span>

				<helper-lang-switcher />
				<helper-theme-switcher />

				<a :href="config.public.repositoryUrl" target="_blank" rel="noopener" class="github" aria-label="GitHub">
					<i class="fab fa-github"></i>
				</a>
			</div>
		</div>
	</header>
</template>

<script setup>
import { useGeneralStore } from '~/stores/generalStore';

const { menuMain } = useGeneralStore();
const config = useRuntimeConfig();
</script>

<style lang="less">
.component-bar-top {
	display: flex;
	height: 64px;
	border-bottom: 1px solid var(--color-border);
	background: var(--color-bg);

	.brand {
		flex: 0 0 var(--aside-width);
		display: flex;
		align-items: center;
		padding: 0 var(--space-l);
		border-right: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.logo {
		display: block;
		width: 52px;
		height: 17px;
		background-position: left center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.bar {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-m);
		padding: 0 var(--space-xl);
		min-width: 0;
	}

	.bar-right {
		display: flex;
		align-items: center;
		gap: var(--space-m);
	}

	.menu {
		display: flex;
		gap: var(--space-m);

		a {
			font-weight: 500;
			color: var(--color-text);

			&:hover,
			&.router-link-active {
				color: var(--color-primary-text);
			}
		}
	}

	.version {
		font-size: var(--text-s);
		color: var(--color-muted-text);
	}

	.divider {
		width: 1px;
		height: 24px;
		background: var(--color-border);
	}

	.github {
		font-size: 20px;
		color: var(--color-text);

		&:hover {
			color: var(--color-primary-text);
		}
	}
}

.theme-light .component-bar-top .logo {
	background-image: url(/logo-nx-ui-light.svg);
}

.theme-dark .component-bar-top .logo {
	background-image: url(/logo-nx-ui-dark.svg);
}

@media only screen and (max-width: 950px) {
	.component-bar-top {
		.brand {
			flex-basis: auto;
			border-right: 0;
			background: none;
		}

		.bar {
			padding: 0 var(--space-m);
		}

		.bar-right {
			gap: var(--space-s);
		}

		.component-search,
		.component-lang-switcher,
		.version,
		.divider {
			display: none;
		}
	}
}
</style>

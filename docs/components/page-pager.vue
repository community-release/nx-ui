<template>
	<nav v-if="prev || next" class="component-page-pager">
		<nuxt-link-locale v-if="prev" :to="prev.url" class="link tag-prev">
			<span class="direction">Previous page</span>
			<span class="label">{{ prev.label }}</span>
		</nuxt-link-locale>
		<span v-else></span>

		<nuxt-link-locale v-if="next" :to="next.url" class="link tag-next">
			<span class="direction">Next page</span>
			<span class="label">{{ next.label }}</span>
		</nuxt-link-locale>
	</nav>
</template>

<script setup>
import { useGeneralStore } from '~/stores/generalStore';

// Data
const { menuPages } = useGeneralStore();
const route = useRoute();
const localePath = useLocalePath();

const index = computed(() => {
	const path = route.path.replace(/\/$/, '');

	return menuPages.findIndex((page) => localePath(page.url) === path);
});

const prev = computed(() => (index.value > 0 ? menuPages[index.value - 1] : null));
const next = computed(() => (index.value > -1 ? menuPages[index.value + 1] || null : null));
</script>

<style lang="less">
.component-page-pager {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-m);
	margin-top: var(--space-2xl);
	padding-top: var(--space-l);
	border-top: 1px solid var(--color-border);

	.link {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: var(--space-s) var(--space-m);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		transition: border-color 0.2s;

		&:hover {
			border-color: var(--color-primary);
		}
	}

	.tag-next {
		align-items: flex-end;
		text-align: right;
	}

	.direction {
		font-size: var(--text-xs);
		color: var(--color-muted-text);
	}

	.label {
		font-weight: bold;
		color: var(--color-primary-text);
	}
}
</style>

<template>
	<section class="component-menu-aside">
		<div v-for="(group, index) of menuAside" :key="group.text" class="group" :class="{ 'tag-collapsed': collapsed[index] }">
			<div class="group-header">
				<nuxt-link-locale v-if="group.url" :to="group.url" class="menu-title">{{ $t(group.text) }}</nuxt-link-locale>
				<span v-else class="menu-title">{{ $t(group.text) }}</span>

				<button
					type="button"
					class="toggle"
					:aria-expanded="!collapsed[index]"
					:aria-label="$t(group.text)"
					@click="collapsed[index] = !collapsed[index]"
				>
					<i class="fas fa-chevron-down"></i>
				</button>
			</div>

			<ul v-show="!collapsed[index]" class="menu-list">
				<li v-for="item of group.items" :key="item.url">
					<nuxt-link-locale :to="item.url" noPrefetch>{{ item.text ? $t(item.text) : item.name }}</nuxt-link-locale>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup>
import { useGeneralStore } from '~/stores/generalStore';

// Data
const { menuAside } = useGeneralStore();

const collapsed = ref(menuAside.map(() => false));

// Hooks
// On narrow screens menu is above the content, collapse groups to show the content
onMounted(() => {
	if (window.matchMedia('(max-width: 950px)').matches) {
		collapsed.value = menuAside.map(() => true);
	}
});
</script>

<style lang="less">
.component-menu-aside {
	.mix-side-menu();

	.group + .group {
		margin-top: var(--space-s);
		padding-top: var(--space-s);
		border-top: 1px solid var(--color-border);
	}

	.group-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.toggle {
		padding: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-muted-text);
		background: none;
		border: 0;
		cursor: pointer;
		.mix-disable-tap-highlight();

		i {
			transition: transform 0.2s;
		}

		&:hover {
			color: var(--color-primary-text);
		}
	}

	.tag-collapsed .toggle i {
		transform: rotate(-90deg);
	}
}
</style>

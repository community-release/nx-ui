<template>
	<section class="component-menu-aside">
		<ul class="menu">
			<li v-for="item of menu">
				<nuxt-link :to="item.url" class="menu-title">{{ item.name }}</nuxt-link>

				<ul v-if="item?.items" class="menu-list">
					<li v-for="subItem of item.items">
						<nuxt-link :to="subItem.url" noPrefetch>{{ subItem.name }}</nuxt-link>
					</li>
				</ul>
			</li>
		</ul>
	</section>
</template>

<script setup>
import components from '~/assets/components.json';

// Data
const props = defineProps([

]);

const menu = [
	{
		name: 'Components',
		url: '/components',
		items: components
	}
];
</script>

<style lang="less">
.component-menu-aside {
	.mix-side-menu();
}
</style>

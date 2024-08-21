<template>
	<section class="component-ui-accordion">
		<ui-accordion-item v-if="list.length" v-for="item of list" :title="item.title">
			<div v-html="item.text"></div>
		</ui-accordion-item>
		<slot></slot>
	</section>
</template>

<script setup>
// Imports
	import { ref, computed, provide } from 'vue';
	import comProps from '#build/ui.accordion.mjs';
	import UiAccordionItem from './accordion-item.vue';

// Data
	const props = defineProps({
		/** Icon for light theme or light & dark theme*/
		icon: {
			type: String,
			default: comProps.icon
		},
		/** Icon for dark theme */
		iconDark: {
			type: String,
			default: comProps.iconDark
		},
		/**
		 * Accordion elements list, AccordionListItem = {title: '', text: ''}
		 * @values AccordionListItem[]
		 */
		list: {
			type: Array,
			default: () => []
		},
		/**
		 * Slide that is open by default, -1 = all closed
		 * @values -1, 1, 2, 3, 1000
		 */
		open: {
			type: Number,
			default: -1
		},
	});

	const open = ref(props.open);
	const counter = ref(0);

	const iconLightComputed = computed(() => {
		return props.icon !== '' ? `url(${props.icon})` : 'none';
	});

	const iconDarkComputed = computed(() => {
		return props.iconDark !== '' ? `url(${props.iconDark})` : iconLightComputed.value;
	});

	provide('accordionData', {
		counter,
		open,
		haveIcon: !!props.icon
	});
</script>

<style lang="less">
// Themes settings
.theme-light .component-ui-accordion .icon,
.theme-lowvision .component-ui-accordion .icon {
	background-image: v-bind(iconLightComputed);
}

.theme-dark .component-ui-accordion .icon {
	background-image: v-bind(iconDarkComputed);
}
</style>
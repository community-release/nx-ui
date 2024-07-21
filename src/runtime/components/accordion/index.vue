<template>
	<section class="component-ui-accordion">
		<ui-accordion-item v-if="list.length" v-for="item of list" :title="item.title">
			{{ item.text }}
		</ui-accordion-item>
		<slot></slot>
	</section>
</template>

<script setup>
// Imports
	import { ref, computed, provide } from 'vue';

// Data
	const props = defineProps({
		/** Icon for light theme or light & dark theme*/
		icon: {
			type: String,
			default: ''
		},
		/** Icon for dark theme */
		iconDark: {
			type: String,
			default: ''
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
		 * Slide that is active(open) by default, null = all closed
		 * @values 1, 2, 3, 1000, null
		 */
		active: {
			type: [Number, null],
			default: 0
		}
	});

	const activeItem = ref(props.active);
	const itemCounter = ref(0);

	const iconLightComputed = computed(() => {
		return props.icon !== '' ? `url(${props.icon})` : 'none';
	});

	const iconDarkComputed = computed(() => {
		return props.iconDark !== '' ? `url(${props.iconDark})` : iconLightComputed.value;
	});

	provide('accordionData', {
		itemCounter,
		activeItem,
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
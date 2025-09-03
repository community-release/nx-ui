<template>
	<div class="component-ui-file-input-preview" @click="close" :class="classes">
		<img :src="modelValue" alt="" aria-hidden="true" />
	</div>
</template>

<script setup>
// Imports
	import { computed } from 'vue';

// Data
	const emit = defineEmits(['update:modelValue']);
	const props = defineProps({
		modelValue: {
			required: true
		}
	});

	const classes = computed(() => {
		const result = [];

		if (props.modelValue) {
			result.push('tag-active');
		}

		return result;
	});

// Methods
	function close() {
		emit('update:modelValue', null);
	}
</script>

<style lang="less">
.component-ui-file-input-preview {
	// Colors
	@com-color-overlay: var(--ui-color-overlay);
	
	z-index: 5000;

	display: none;
	position: fixed;
	inset: 0;
	place-items: center;

	background: @com-color-overlay;

	&.tag-active {
		display: grid;
	}
}
</style>
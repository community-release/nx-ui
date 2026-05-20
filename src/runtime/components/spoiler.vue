<template>
	<div class="component-ui-spoiler" :class="{'tag-active': isShown}">
		<div :id="cid" class="content" :inert="!isShown">
			<div>
				<slot></slot>
			</div>
		</div>
		<ui-button variant="flat" class="title" @click="handleClick" :aria-expanded="isShown.toString()" :aria-controls="cid">{{ isShown ? hideText : showText }}</ui-button>
	</div>
</template>

<script setup>
// Imports
	import { watch, ref } from 'vue';
	import uniq from './helpers/uniq';

// Data
	const emit = defineEmits(['update:modelValue']);
	const props = defineProps({
		showText: {
			type: String,
			default: 'Show'
		},
		hideText: {
			type: String,
			default: 'Hide'
		},
		modelValue: {
			type: [Boolean, null],
			default: null
		}
	});

	const cid = 'spoiler-' + uniq();
	let isShown = ref(false);
	let hasModel = props.modelValue !== null;
	
	if (hasModel) {
		watch(() => props.modelValue, (v) => {
			isShown.value = v;
		}, { immediate: true });
	}

// Methods
	function handleClick() {
		if (hasModel) {
			emit('update:modelValue', !isShown.value);
		} else {
			isShown.value = !isShown.value;
		}
	}
</script>

<style lang="less">
.component-ui-spoiler {
	@com-space-2xs: var(--ui-space-2xs);
	@com-ani-ease: var(--ui-ani-ease);
	@com-ani-time: var(--ui-ani-time);
	@com-color-primary-text: var(--ui-color-primary-text);
	@com-font-weight-medium: var(--ui-font-weight-medium);

	> .title {
		margin-left: calc(@com-space-2xs * -1);
	}

	> .title {
		padding-inline: @com-space-2xs;

		.button-content .slot-default {
			padding-inline: 0;
		}
	}

	> .content {
		transition: grid-template-rows @com-ani-time @com-ani-ease;
		display: grid;
		grid-template-rows: 0fr;

		div {
			overflow: hidden;
		}
	}

	&.tag-active {
		> .content {
			grid-template-rows: 1fr;
		}
	}
}
</style>
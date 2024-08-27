<template>
	<div class="component-ui-spoiler" :class="{'tag-active': isShown}">
		<div class="content">
			<div>
				<slot></slot>
			</div>
		</div>
		<div class="title" @click="handleClick">{{ isShown ? hideText : showText }}</div>
	</div>
</template>

<script setup>
import { watch, ref } from 'vue';

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
	@com-space-mini: var(--ui-space-mini);
	@com-ani-ease: var(--ui-ani-ease);
	@com-ani-time: var(--ui-ani-time);
	@com-color-primary-text: var(--ui-color-primary-text);
	@com-font-weight-medium: var(--ui-font-weight-medium);

	> .title {
		padding-top: @com-space-mini;

		color: @com-color-primary-text;
		font-weight: @com-font-weight-medium;
		cursor: pointer;

		-webkit-user-select: none;
		user-select: none;
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
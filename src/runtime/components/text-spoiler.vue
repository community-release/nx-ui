<template>
	<div class="component-ui-text-spoiler">
		<div class="content">{{ computedText }}</div>
		<div v-if="textTooLong" class="title" @click="handleClick">{{ isShown ? hideText : showText }}</div>
	</div>
</template>

<script setup>
import { watch, ref, computed } from 'vue';

// Data
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	text: {
		type: String,
		default: '...'
	},
	showText: {
		type: String,
		default: 'Show'
	},
	hideText: {
		type: String,
		default: 'Hide'
	},
	length: {
		type: Number,
		default: 0
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

let textTooLong = computed(() => {
	return props.text.length > props.length;
});

const computedText = computed(() => {
	if (!isShown.value && textTooLong.value) {
		return props.text.slice(0, props.length) + '...';
	} else {
		return props.text;
	}
});

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
.component-ui-text-spoiler {
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
		position: relative;
	}
}
</style>
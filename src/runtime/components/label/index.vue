<template>
	<label class="component-ui-label" :class="[`tag-size-${size}`, `tag-weight-${weight}`]">
		<span class="component-ui-label--text">{{ text }}</span>
		<slot></slot>
	</label>
</template>

<script setup>
// Import
	import comProps from '#build/ui.label.mjs';

// Date
	const props = defineProps({
		text: {
			default: '',
		},
		size: {
			type: String,
			default: comProps.size,
		},
		weight: {
			type: [String, Number],
			default: comProps.weight,
		},
	});
</script>

<style lang="less">
@com-space-micro: var(--ui-space-micro);
@com-color-header-text: var(--ui-color-header-text);
@com-font-weight-medium: var(--ui-font-weight-medium);

@com-text-big: var(--ui-text-big);
@com-text-medium: var(--ui-text-medium);
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

.component-ui-label {
	display: block;

	.component-ui-label--text {
		display: block;
		padding-bottom: @com-space-micro;
		font-weight: @com-font-weight-medium;
		font-size: @com-text-default;
		color: @com-color-header-text;
	}

	// Text size
	&.tag-size-big .component-ui-label--text { font-size: @com-text-big; }
	&.tag-size-medium .component-ui-label--text { font-size: @com-text-medium; }
	&.tag-size-default .component-ui-label--text { font-size: @com-text-default; }
	&.tag-size-small .component-ui-label--text { font-size: @com-text-small; }

	// Text weight
	&.tag-weight-700 .component-ui-label--text { font-weight: 700; }
	&.tag-weight-600 .component-ui-label--text { font-weight: 600; }
	&.tag-weight-500 .component-ui-label--text { font-weight: 500; }
	&.tag-weight-400 .component-ui-label--text { font-weight: 400; }
}
</style>
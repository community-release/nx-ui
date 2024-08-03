<template>
	<label class="component-ui-label" :class="`tag-size-${size}`">
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
		}
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
		font-size: @com-text-medium;
		color: @com-color-header-text;
	}

	// Text size
	&.tag-size-big .component-ui-label--text { font-size: @com-text-big; }
	&.tag-size-medium .component-ui-label--text { font-size: @com-text-medium; }
	&.tag-size-small .component-ui-label--text { font-size: @com-text-small; }
}
</style>
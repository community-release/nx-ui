<template>
	<div>
		<div class="component-ui-label" :class="[`tag-size-${size}`, `tag-weight-${weight}`, required ? 'tag-required' : '']">
			<component :is="isLegend ? 'legend' : 'label'" class="component-ui-label--text" :for="labelFor">
				{{ text }} <span v-if="required" aria-hidden="true">*</span>
			</component>
			<slot />
		</div>
	</div>
</template>

<script setup>
// Import
	import comProps from '#build/ui.label.mjs';

// Date
	const props = defineProps({
		text: {
			default: '',
		},
		fieldset: {
			type: Boolean,
			default: false,
		},
		labelFor: {
			default: ''
		},
		isLegend: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: comProps.size,
		},
		weight: {
			type: [String, Number],
			default: comProps.weight,
		},
		required: {
			type: Boolean,
			default: false
		},
	});
</script>

<style lang="less">
@com-space-micro: var(--ui-space-micro);

@com-font-weight-medium: var(--ui-font-weight-medium);

@com-color-header-text: var(--ui-color-header-text);
@com-color-red: var(--ui-color-red);

@com-text-big: var(--ui-text-big);
@com-text-medium: var(--ui-text-medium);
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

.component-ui-label {
	.component-ui-label--text {
		position: relative;
		display: block;
		padding-bottom: @com-space-micro;
		font-weight: @com-font-weight-medium;
		font-size: @com-text-default;
		color: @com-color-header-text;
	}

	// Text size
	&.tag-size-big > .component-ui-label--text { font-size: @com-text-big; }
	&.tag-size-medium > .component-ui-label--text { font-size: @com-text-medium; }
	&.tag-size-default > .component-ui-label--text { font-size: @com-text-default; }
	&.tag-size-small > .component-ui-label--text { font-size: @com-text-small; }

	// Text weight
	&.tag-weight-700 > .component-ui-label--text { font-weight: 700; }
	&.tag-weight-600 > .component-ui-label--text { font-weight: 600; }
	&.tag-weight-500 > .component-ui-label--text { font-weight: 500; }
	&.tag-weight-400 > .component-ui-label--text { font-weight: 400; }

	// Required
	&.tag-required .component-ui-label--text span {
		color: @com-color-red;
		font-weight: bold;
	}
}
</style>
<template>
	<div>
		<div class="component-ui-label" :class="[`tag-size-${size}`, `tag-weight-${weight}`, required ? 'tag-required' : '']">
			<component :is="isLegend ? 'legend' : tag" class="component-ui-label--text" :for="labelFor">
				{{ text }} <span v-if="required" aria-hidden="true" class="required">*</span>

				<span v-if="description" class="description" v-html="description"></span>
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
		description: {
			default: '',
		},
		fieldset: {
			type: Boolean,
			default: false,
		},
		labelFor: {
			default: ''
		},
		// TODO: get rid of isLegend (check what projects use it)
		isLegend: {
			type: Boolean,
			default: false
		},
		tag: {
			type: String,
			default: 'label'
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
@com-space-2xs: var(--ui-space-2xs);

@com-font-weight-medium: var(--ui-font-weight-medium);

@com-color-header-text: var(--ui-color-header-text);
@com-color-muted-text: var(--ui-color-muted-text);
@com-color-red: var(--ui-color-red);

@com-text-xl: var(--ui-text-xl);
@com-text-l: var(--ui-text-l);
@com-text-m: var(--ui-text-m);
@com-text-s: var(--ui-text-s);

.component-ui-label {
	.component-ui-label--text {
		position: relative;
		display: block;
		padding-bottom: @com-space-2xs;
		font-weight: @com-font-weight-medium;
		font-size: @com-text-m;
		color: @com-color-header-text;

		.description {
			display: block;
			font-weight: normal;
			color: @com-color-muted-text;
		}
	}

	// Text size
	&.tag-size-xl > .component-ui-label--text { font-size: @com-text-xl; }
	&.tag-size-l > .component-ui-label--text { font-size: @com-text-l; }
	&.tag-size-m > .component-ui-label--text { font-size: @com-text-m; }
	&.tag-size-s > .component-ui-label--text { font-size: @com-text-s; }

	// Text weight
	&.tag-weight-700 > .component-ui-label--text { font-weight: 700; }
	&.tag-weight-600 > .component-ui-label--text { font-weight: 600; }
	&.tag-weight-500 > .component-ui-label--text { font-weight: 500; }
	&.tag-weight-400 > .component-ui-label--text { font-weight: 400; }

	// Required
	&.tag-required .component-ui-label--text .required {
		color: @com-color-red;
		font-weight: bold;
	}
}
</style>
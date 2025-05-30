<template>
	<div class="component-ui-select" :class="classes" :style="styles">
		<div class="wrapper">
			<div class="value" @click="toggle">
				<div v-if="label" v-html="label"></div>
				<strong v-if="valueName" v-html="valueName"></strong>
			</div>

			<select 
				ref="select"

				:id="inputId"
				@change="onChange"
				@focus="handleFocus"
				@blur="handleBlur"
				:aria-required="required ? 'true' : 'false'"
				:disabled="disabled"
				autocomplete="off"
			>
				<option v-for="option in options" :value="option.value" :key="option.value" :selected="option.value == modelValue">
					{{ option.name }}
				</option>
			</select>
		</div>
	</div>
</template>

<script setup>
// Imports
import { ref, computed, watch, onMounted, nextTick } from 'vue';

// Setup
const props = defineProps({
	inputId: {
		default: '',
	},
	theme: {
		type: String,
		default: 'default',
	},
	label: {
		type: String,
		default: ''
	},
	modelValue: {
		default: '',
		required: true,
	},
	// { name: '', value: '' }
	options: {
		type: Array,
		default: () => []
	},
	required: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	},
	width: {
		type: [String, Number],
		default: 'none'
	},
});

const emit = defineEmits(['update:modelValue']);

// Data
const isOpen = ref(false);
const increaseZIndex = ref(false);
const focus = ref(false);
const select = ref(null);

const valueName = computed(() => {
	let result = '...';

	const value = props.modelValue;
	const option = props.options.find(option => option.value == value);

	if (typeof option !== 'undefined') { result = option.name; }

	return result;
});

const classes = computed(() => {
	const ar = [];

	ar.push( 'tag-theme-' + props.theme );

	if (isOpen.value) 				ar.push('tag-open');
	if (increaseZIndex.value) 		ar.push('tag-increase-zindex');
	if (props.modelValue !== null) 	ar.push('tag-not-empty');
	if (props.error) 				ar.push('tag-error');
	if (focus.value) 				ar.push('tag-focus');
	if (props.disabled) 			ar.push('tag-disabled');
	if (props.label) 				ar.push('tag-label');

	return ar;
});

const styles = computed(() => {
	const result = {};

	if (props.width !== 'none') {
		result['max-width'] = props.width;
		result['width'] = '100%';
	}

	return result;
});

watch(isOpen, (v) =>{
	if (v)
		increaseZIndex.value = true;
	else
		setTimeout(() => {increaseZIndex.value = false}, 280);
});

watch(() => props.modelValue, async (v) => {
	await nextTick();
	select.value.value = v;
});

watch(() => props.options, async () => {
	await nextTick();
	select.value.value = props.modelValue
});

// Methods
function onChange() {
	isOpen.value = false;

	emit('update:modelValue', select.value.value);
};

function toggle() {
	isOpen.value = !isOpen.value;
};

function handleFocus() { focus.value = true; };
function handleBlur() { focus.value = false; };

// Hooks
onMounted(() => {
	// Fix autocomplete
	if (select.value.value !== props.modelValue) {
		select.value.value = props.modelValue;
	}
});
</script>

<style lang="less">
@import (less) './styles/components.less';

@com-space-micro: var(--ui-space-micro);
@com-input-height-default: var(--ui-input-height-default);

@com-font-header: var(--ui-font-header);
@com-value-font-weight: @ui-select-value-font-weight;

@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

@com-color-text: var(--ui-color-text);
@com-color-gray-text: var(--ui-color-gray-text);
@com-color-header-text: var(--ui-color-header-text);
@com-color-primary: var(--ui-color-primary);
@com-color-surface: var(--ui-color-surface);
@com-color-red: var(--ui-color-red);
@com-color-border: var(--ui-color-border-bolder);
@com-color-error: var(--ui-color-error);

@com-border-radius-default: var(--ui-border-radius-default);
@com-bs-1: var(--ui-bs-1);

// Ally
@com-outline: var(--ui-outline);

.component-ui-select {
	position: relative;
	text-align: left;
	font-size: @com-text-default;
	line-height: 1.1;

	.wrapper {
		position: relative;

		select {
			opacity: 0;
			padding-right: 45px;
			padding-left: 10px;
			height: @com-input-height-default;
			width: 100%;

			cursor: pointer;
		}
	}

	.value {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		cursor: pointer;

		padding-right: 45px;
		padding-left: 10px;
		height: 100%;

		cursor: pointer;

		border: 1px solid @com-color-border;
		border-radius: @com-border-radius-default;

		label, strong {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			position: absolute;
			left: 10px;
			right: 30px;
		}

		strong {
			transform: translateY(-50%);
			top: 50%;
			bottom: auto;
			font-family: @com-font-header;
			font-weight: @com-value-font-weight;
			color: @com-color-header-text;
		}

		&:after {
			content: '';

			transform: translateY(-50%);
			position: absolute;
			top: 50%;
			right: 10px;

			width: 0;
			height: 0;
			border-style: solid;
			border-width: 6px 5px 0 5px;
			border-color: @com-color-header-text transparent transparent transparent;
		}
	}

	&.tag-label {
		.value {
			label {
				top: 3px;
				margin: 0;
				padding: 0 0 5px 0;
				font-size: @com-text-small;
				
				color: @com-color-gray-text;
			}

			strong {
				transform: none;
				top: 20px;
				bottom: 0;
			}
		}
	}

	&.tag-disabled {
		opacity: 0.6;
		cursor: not-allowed;

		.wrapper {
			pointer-events: none;
		}
	}

	&.tag-focus {
		.value {
			border-color: transparent;
			outline: @com-outline;
		}


	}

	&.tag-error {
		.value {
			border-color: @com-color-error;
		}

		&.tag-focus .value {
			border-color: transparent;
		}
	}
}

.component-ui-select.tag-theme-default {
	.value {
		background: @com-color-surface;
		border-color: transparent;
	}

	&.tag-error {
		.value {
			border-color: @com-color-error;
		}

		&.tag-focus .value {
			border-color: transparent;
		}
	}
}
</style>

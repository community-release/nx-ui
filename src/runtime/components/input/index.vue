<template>
	<div class="component-ui-input" :class="classes" @click="refInput.focus()">
		<ui-impulse-indicator :impulse="impulse" @update:impulse="$emit('update:impulse', false)" />

		<div class="com-content">
			<div class="slot-prepend" v-if="hasSlot('prepend')"><slot name="prepend"></slot></div>
			<div class="slot-default">
				<input
					ref="refInput"

					:id="inputId"
					:value="modelValue"
					:type="type" 
					:placeholder="placeholder" 
					:disabled="disabled" 
					:aria-required="required ? 'true' : 'false'"

					@change="updateValue($event.target.value)"
					@input="updateValue($event.target.value)"
					@focus="handleFocusBlur(true, $event.target.value)"
					@blur="handleFocusBlur(false, $event.target.value)"
					@keyup.enter="updateValue($event.target.value, true, true)"
					@keydown.down="emit('keydown.down', $event)"
					@keydown.tab="emit('keydown.tab', $event)"
					@keydown.esc.prevent="emit('keydown.esc', $event)"

					formnovalidate
					spellcheck="false"

					v-bind="inputAttrs"
				/>
			</div>
			<div class="slot-append" v-if="hasSlot('append')"><slot name="append"></slot></div>
		</div>
	</div>
</template>

<script setup>
// Import
	import { ref, computed, useSlots, useAttrs } from 'vue';
	import UiImpulseIndicator from '../impulse-indicator.vue';
	import comProps from '#build/ui.input.mjs';

// Misc
	const emit = defineEmits([
		'input', 'enter', 'focus', 'blur', 'update:modelValue',
		'keydown.down', 'keydown.tab', 'keydown.esc',
	]);
	const slots = useSlots();
	const attrs = useAttrs();

// Data
	const props = defineProps({
		modelValue: {
			required: true
		},
		inputId: {
			default: '',
		},
		placeholder: {
			default: comProps.placeholder,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'text'
		},
		impulse: {
			default: false
		},
		shape: {
			type: String,
			default: comProps.shape,
		},
		size: {
			type: String,
			default: comProps.size,
		},
	});

	const refInput = ref(null);
	const haveFocus = ref(false);

	const classes = computed(() => {
		const ar = [];

		if (props.modelValue !== '') ar.push('tag-not-empty');
		if (haveFocus.value) ar.push('tag-focus');
		if (props.disabled) ar.push('tag-disabled');
		if (props.size) ar.push(`tag-size-${props.size}`);
		if (props.shape) ar.push(`tag-shape-${props.shape}`);
		if (props.error) ar.push(`tag-error`);

		return ar;
	});

	const inputAttrs = {};
	for (const key in attrs) {
		if (key.startsWith('input.')) {
			const k = key.slice(6) // All after "input."

			inputAttrs[k] = attrs[key];
		}
	}

// Methods
	function updateValue(value, doTrim = false, submit = false) {
		const validValue = doTrim ? value.trim() : value;

		if (value !== validValue)
			refInput.value.value = validValue;

		if (props.modelValue !== validValue) {
			emit('update:modelValue', validValue);
			emit('input', validValue);
		}

		if (submit) emit('enter', validValue);
	}

	function handleFocusBlur(focus, value) {
		haveFocus.value = focus;
		emit(focus ? 'focus' : 'blur', focus);
		
		if (!focus) updateValue(value);
	}

	const hasSlot = (name) => {
		return !!slots[name];
	};

// Expose
	defineExpose({
		refInput
	});
</script>

<style lang="less">
@import '../styles/components.less';

// Misc
@com-ani-ease: var(--ui-ani-ease);

// Input height
@com-input-height-2xl: var(--ui-input-height-2xl);
@com-input-height-xl: var(--ui-input-height-xl);
@com-input-height-l: var(--ui-input-height-l);
@com-input-height-m: var(--ui-input-height-m);
@com-input-height-s: var(--ui-input-height-s);
@com-input-height-xs: var(--ui-input-height-xs);

// Border radius
@com-border-radius-m: var(--ui-border-radius-m);
@com-border-radius-s: var(--ui-border-radius-s);
@com-border-radius-round: var(--ui-input-height-2xl);

// Color
@com-color-border-bolder: var(--ui-color-border-bolder);
@com-color-bg: var(--ui-color-bg);
@com-color-surface: @ui-input-background-color;
@com-color-header-text: var(--ui-color-header-text);
@com-color-muted-text: var(--ui-color-muted-text);
@com-color-primary: var(--ui-color-primary);
@com-color-error: var(--ui-color-error);

// Space
@com-space-s: var(--ui-space-s);
@com-space-xs: var(--ui-space-xs;);

// Font
@com-font-text: var(--ui-font-text);

// Text size
@com-text-m: var(--ui-text-m);
@com-text-s: var(--ui-text-s);
@com-text-xs: var(--ui-text-xs);

// Ally
@com-outline: var(--ui-outline);

.component-ui-input {
	overflow: hidden;
	position: relative;
	height: @com-input-height-m;
	border: 1px solid @com-color-border-bolder;
	border-radius: @com-border-radius-m;
	background: @com-color-surface;
	cursor: text;

	.com-content {
		display: flex;
		height: 100%;

		> div {
			position: relative;
			height: 100%;
		}

		.slot-prepend,
		.slot-append {
			flex: 0 0 40px;
			display: grid;
			place-items: center;
		}
	}

	.slot-default {
		width: 100%;
	}

	input {
		box-sizing: border-box; -webkit-box-sizing: border-box; -moz-box-sizing: border-box;
		
		display: block;
		padding: 0 @com-space-xs;
		width: 100%;
		height: 100%;
		
		font-family: @com-font-text;
		font-size: @com-text-m;
		color: @com-color-header-text;

		background: transparent;
		border: none;
	}

	// Shape
	&.tag-shape-round {
		border-radius: @com-border-radius-round;
	}
	&.tag-shape-round-square {
		border-radius: @com-border-radius-s;
	}
	&.tag-shape-square {
		border-radius: 0;
	}

	// Size
	&.tag-size-2xl { height: @com-input-height-2xl; }
	&.tag-size-xl { height: @com-input-height-xl; }
	&.tag-size-l { height: @com-input-height-l; }
	&.tag-size-m {
		//padding: 0 @com-space-s;
		height: @com-input-height-m;
		font-size: @com-text-s;
	}

	&.tag-size-s {
		height: @com-input-height-s;
		font-size: @com-text-s;
	}

	&.tag-size-xs {
		//padding: 0 10px;
		height: @com-input-height-xs;
		font-size: @com-text-xs;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.6);
		}
	}

	// Focus
	&.tag-focus {
		border-color: transparent;
		outline: @com-outline;
	}

	// Disabled
	&.tag-disabled {
		cursor: not-allowed;
		opacity: 0.6;

		input {
			cursor: not-allowed;
		}
	}

	// Error
	&.tag-error {
		border-color: @com-color-error;

		&.tag-focus {
			border-color: transparent;
		}
	}
}
</style>
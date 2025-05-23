<template>
	<component 
		class="component-ui component-ui-button"
		:is="computedType" 
		:href="href" 
		:to="href" 
		:class="classes" 
		:style="styles" 
		@click="handleClick"
		ref="refCom"
	>
		<div class="button-bg" :style="buttonBgStyle"></div>

		<ui-impulse-indicator :impulse="impulse" />

		<span class="button-content">
			<span><slot name="prepend"></slot></span>
			<span class="slot-default"><slot></slot></span>
			<span><slot name="append"></slot></span>
		</span>

		<ui-loading class="loading-indicator" :active="loading"></ui-loading>
	</component>
</template>

<script setup>
// Imports
	import { ref, computed } from 'vue';
	import UiImpulseIndicator from '../impulse-indicator.vue';
	import UiLoading from '../loading.vue';
	import comProps from '#build/ui.button.mjs';

// Data
	const props = defineProps({
		color: {
			type: String,
			default: comProps.color,
		},
		size: {
			type: String,
			default: comProps.size,
		},
		variant: {
			type: String,
			default: comProps.variant,
		},
		shape: {
			type: String,
			default: comProps.shape,
		},
		href: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		block: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: [Boolean, Number],
			default: false,
		},
	});

	const refCom = ref(null);

	const impulse = ref(false);
		
	const computedType = computed(() => {
		return props.type !== '' ? props.type : (props.href !== '' ? 'a' : 'button');
	});

	const classes = computed(() => {
		let ar = [];

		if (props.size) ar.push(`tag-size-${props.size}`);
		if (props.shape) ar.push(`tag-shape-${props.shape}`);
		if (props.variant) ar.push(`tag-variant-${props.variant}`);
		if (props.block) ar.push('tag-block');
		if (props.loading) ar.push('tag-loading');
		if (props.disabled) ar.push('tag-disabled');

		return ar;
	});

	const styles = computed(() => {
		let background = `var(--ui-color-${props.color})`;
		let color = `var(--ui-color-text-on-${props.color})`;

		if (props.variant === 'flat' || props.variant === 'outline') {
			background = 'transparent';
			color = `var(--ui-color-${props.color}-text)`;
		}

		return {
			background,
			color,
		};
	});

	const stylesHover = computed(() => {
		let background = `var(--ui-color-${props.color})`;
		let color = `var(--ui-color-text-on-${props.color})`;

		if (props.variant === 'flat' || props.variant === 'outline') {
			background = `var(--ui-color-surface)`;
			color = `var(--ui-color-${props.color}-text)`;
		}

		return {
			background,
			color,
		};
	});
	const buttonBgStyle = computed(() => {
		return {
			'background': (props.variant === 'flat' || props.variant === 'outline') ? `var(--ui-color-${props.color.value})` : 'rgba(66,88,120, 0.075)'
		}
	});

	// Methods
	function handleClick(e) {
		if (props.disabled || props.loading) return;

		let rect = refCom.value.getBoundingClientRect();

		impulse.value = {
			left	: e.clientX - rect.left,
			top		: e.clientY - rect.top,
			width	: refCom.value.offsetWidth,
			height	: refCom.value.offsetHeight
		};
	}
</script>

<style lang="less">
.component-ui-button {
	--button-hover-text-color: #fff;
	--button-hover-background: #fff;
	--button-text-color: #fff;
	--button-background: #fff;

	--button-hover-text-color: v-bind(stylesHover.color);
	--button-hover-background: v-bind(stylesHover.background);
	--button-text-color: v-bind(styles.color);
	--button-background: v-bind(styles.background);

	// Input height
	@com-input-height-large: var(--ui-input-height-large);
	@com-input-height-big: var(--ui-input-height-big);
	@com-input-height-medium: var(--ui-input-height-medium);
	@com-input-height-default: var(--ui-input-height-default);
	@com-input-height-small: var(--ui-input-height-small);
	@com-input-height-mini: var(--ui-input-height-mini);

	// Animation
	@com-ani-time: var(--ui-ani-time);
	@com-ani-ease: var(--ui-ani-ease);

	// Colors
	@com-color-header-text: var(--ui-color-header-text);
	@com-color-primary: var(--ui-color-primary);
	@com-color-primary-text: var(--ui-color-primary-text);
	@com-color-secondary: var(--ui-color-secondary);
	@com-color-border-bolder: var(--ui-color-border-bolder);

	// Border radius
	@com-border-radius-default: var(--ui-border-radius-default);
	@com-border-radius-small: var(--ui-border-radius-small);
	@com-border-radius-round: var(--ui-input-height-large);

	// Padding
	@com-space-default: var(--ui-space-default);
	@com-space-small: var(--ui-space-small);
	@com-space-mini: var(--ui-space-mini);

	// Text
	@com-text-default: var(--ui-text-default);
	@com-text-small: var(--ui-text-small);
	@com-text-mini: var(--ui-text-mini);

	// Font
	@com-font-header: var(--ui-font-header);

	// Box shadow
	@com-bs-1: var(--ui-bs-1);

	transition: opacity @com-ani-time @com-ani-ease, visibility @com-ani-time @com-ani-ease;

	overflow: hidden;
	position: relative;
	display: inline-block;
	vertical-align: top;

	padding: 0 @com-space-default;
	height: @com-input-height-default;
	line-height: 1.1;

	text-align: center;
	font-size: @com-text-default;
	font-weight: normal;

	cursor: pointer;
	border: 1px solid transparent;
	border-radius: @com-border-radius-default;

	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;

	img {
		width: 35px;
		max-width: none;
	}

	.button-bg {
		transition: opacity @com-ani-time @com-ani-ease;

		opacity: 0;
		position: absolute;
		inset: 0;
	}

	.button-content {
		transition: opacity @com-ani-time @com-ani-ease, visibility @com-ani-time @com-ani-ease, color @com-ani-time @com-ani-ease;

		display: flex;
		align-items: center;
		justify-content: center;
		
		position: relative;
		height: 100%;
		font-weight: 600;
		font-family: @com-font-header;

		.slot-default {
			padding: 0 @com-space-mini;
			line-height: 1;
		}

		.ic {
			font-weight: normal;
		}
	}

	.loading-indicator {
		transform: translate3d(-50%, -50%, 0);
		position: absolute;
		top: 50%;
		left: 50%;

		svg circle {
			stroke: var(--button-text-color);
		}
	}

	// Loading state
	&.tag-loading {
		cursor: default;

		.button-content {
			opacity: 0;
			visibility: hidden;
		}
	}

	// Flat
	&.tag-variant-flat {
		border: none;
		box-shadow: none;
		background: transparent;
	}

	// Outline
	&.tag-variant-outline {
		background: transparent;
		border: 1px solid var(--button-text-color);
	}

	// Shapes
	&.tag-shape-circle {
		padding: 0 !important;
		width: @com-input-height-default;
		border-radius: 50%;

		&.tag-size-large { width: @com-input-height-large; }
		&.tag-size-big { width: @com-input-height-big; }
		&.tag-size-medium { width: @com-input-height-big; }
		&.tag-size-small { width: @com-input-height-small; }
		&.tag-size-mini { width: @com-input-height-mini; }
	}
	&.tag-shape-round {
		border-radius: @com-border-radius-round;
	}
	&.tag-shape-round-square {
		border-radius: @com-border-radius-small;
	}
	&.tag-shape-square {
		border-radius: 0;
	}

	// Block
	&.tag-block {
		display: block;
		padding: 0 @com-space-mini;
		width: 100%;
	}

	// Size
	&.tag-size-large {
		height: @com-input-height-large;
	}

	&.tag-size-big {
		height: @com-input-height-big;
	}

	&.tag-size-medium {
		height: @com-input-height-medium;
	}

	&.tag-size-small {
		padding: 0 @com-space-small;
		height: @com-input-height-small;

		font-size: @com-text-small;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.8);
		}
	}

	&.tag-size-mini {
		padding: 0 10px;
		height: @com-input-height-mini;

		font-size: @com-text-mini;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.6);
		}
	}

	// Disabled
	&.tag-disabled {
		opacity: 0.6;
		cursor: default;
		pointer-events: none;
	}
}

@media (hover: hover) {
	.component-ui-button {
		// Ally
		@com-outline: var(--ui-outline);
		@com-outline-offset: var(--ui-outline-offset);

		&:hover {
			text-decoration: none;
			color: var(--button-hover-text-color) !important;
			background: var(--button-hover-background) !important;

			.button-bg { opacity: 1; }
		}

		&:focus {
			outline: none;
		}
		&:focus-visible {
			outline: @com-outline;
			outline-offset: @com-outline-offset;
		}
	}
}
</style>
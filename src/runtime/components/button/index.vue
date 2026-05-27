<template>
	<component
		:is="computedType"
		class="component-ui component-ui-button"
		:href="href"
		:to="to"
		:class="classes" 
		:style="styles" 
		@click="handleClick"
		ref="refCom"
	>
		<div class="button-bg"  :style="buttonBgStyle"></div>

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
	import { ref, computed, resolveComponent } from 'vue';
	import UiImpulseIndicator from '../impulse-indicator.vue';
	import UiLoading from '../loading.vue';
	import comProps from '#build/ui.button.mjs';
	import { useRouter } from 'vue-router';

// Composables
	const router = useRouter();

// Data
	const props = defineProps({
		color: {
			type: String,
			default: comProps.color,
		},
		hoverColorTransform: {
			type: String,
			default: comProps.hoverColorTransform,
		},
		hoverFlatColor: {
			type: String,
			default: comProps.hoverFlatColor,
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
			default: null,
		},
		to: {
			type: String,
			default: null,
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
	const NuxtLinkComponent = resolveComponent('NuxtLink');

	const computedType = props.to ? NuxtLinkComponent : (props.href ? 'a' : 'button');

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
			background = `var(--ui-color-${props.hoverFlatColor})`;
			color = `var(--ui-color-${props.color}-text)`;
		}

		return {
			background,
			color,
		};
	});
	const buttonBgStyle = computed(() => {
		return {
			// Лучше результат но хуже поддержка браузеров чем при использование color-mix
			'background': (props.variant === 'flat' || props.variant === 'outline') ? `transparent` : `oklch(from var(--ui-color-${props.color}) ${props.hoverColorTransform})`
		}
	});

	// Methods
	function handleClick(e) {
		if (props.disabled || props.loading) return;

		let rect = refCom.value?.$el ? refCom.value?.$el?.getBoundingClientRect() : refCom.value?.getBoundingClientRect();

		impulse.value = {
			left	: e.clientX - rect.left,
			top		: e.clientY - rect.top,
			width	: refCom.value.offsetWidth,
			height	: refCom.value.offsetHeight
		};
	}

	// Expose
	defineExpose({
		refCom
	});
</script>

<style lang="less">
@import (less) '../styles/components.less';

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
	@com-input-size-2xl: var(--ui-input-size-2xl);
	@com-input-size-xl: var(--ui-input-size-xl);
	@com-input-size-l: var(--ui-input-size-l);
	@com-input-size-m: var(--ui-input-size-m);
	@com-input-size-s: var(--ui-input-size-s);
	@com-input-size-xs: var(--ui-input-size-xs);

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
	@com-border-radius-m: var(--ui-border-radius-m);
	@com-border-radius-s: var(--ui-border-radius-s);
	@com-border-radius-round: var(--ui-input-size-2xl);

	// Padding
	@com-space-m: var(--ui-space-m);
	@com-space-s: var(--ui-space-s);
	@com-space-xs: var(--ui-space-xs);

	// Text
	@com-text-m: var(--ui-text-m);
	@com-text-s: var(--ui-text-s);
	@com-text-xs: var(--ui-text-xs);

	// Font
	@com-font-header: var(--ui-font-header);
	@com-font-weight: @ui-button-font-weight;

	// Box shadow
	@com-bs-1: var(--ui-bs-1);

	transition: opacity @com-ani-time @com-ani-ease, visibility @com-ani-time @com-ani-ease;

	overflow: hidden;
	position: relative;
	display: inline-block;
	vertical-align: top;

	padding: 0 @com-space-m;
	height: @com-input-size-m;
	line-height: 1.1;

	text-align: center;
	font-size: @com-text-m;
	font-weight: normal;

	cursor: pointer;
	border: 1px solid transparent;
	border-radius: @com-border-radius-m;

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
		font-weight: @com-font-weight;
		font-family: @com-font-header;

		.slot-default {
			padding: 0 @com-space-xs;
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
		width: @com-input-size-m;
		border-radius: 50%;

		&.tag-size-2xl { width: @com-input-size-2xl; }
		&.tag-size-xl { width: @com-input-size-xl; }
		&.tag-size-l { width: @com-input-size-xl; }
		&.tag-size-s { width: @com-input-size-s; }
		&.tag-size-xs { width: @com-input-size-xs; }
	}
	&.tag-shape-round {
		border-radius: @com-border-radius-round;
	}
	&.tag-shape-round-square {
		border-radius: @com-border-radius-s;
	}
	&.tag-shape-square {
		border-radius: 0;
	}

	// Block
	&.tag-block {
		display: block;
		padding: 0 @com-space-xs;
		width: 100%;
	}

	// Size
	&.tag-size-2xl {
		height: @com-input-size-2xl;
	}

	&.tag-size-xl {
		height: @com-input-size-xl;
	}

	&.tag-size-l {
		height: @com-input-size-l;
	}

	&.tag-size-s {
		padding: 0 @com-space-s;
		height: @com-input-size-s;

		font-size: @com-text-s;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.8);
		}
	}

	&.tag-size-xs {
		padding: 0 10px;
		height: @com-input-size-xs;

		font-size: @com-text-xs;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.6);
		}
	}

	// Disabled
	&.tag-disabled {
		opacity: 0.6;
		cursor: not-allowed;
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
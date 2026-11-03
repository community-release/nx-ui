<template>
	<div class="component-ui-map-zoom">
		<div class="prepend"><slot /></div>
		<ui-button
			@click="store.zoomIn"
			class="plus"
			color="gray"
			block
			variant="flat"
			size="s"
			shape="square"
			:aria-label="dictionary.zoomIn"
		>
			<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
		</ui-button>
		<div class="separator"></div>
		<ui-button
			@click="store.zoomOut"
			class="minus"
			color="gray"
			block
			variant="flat"
			size="s"
			shape="square"
			:aria-label="dictionary.zoomOut"
		>
			<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
		</ui-button>
	</div>
</template>

<script setup>
const props = defineProps({
	store: {
		required: true,
		type: Object
	},
	/**
	 * Buttons labels for screen readers
	 */
	dictionary: {
		type: Object,
		default() {
			return {
				zoomIn: 'Zoom in',
				zoomOut: 'Zoom out',
			};
		}
	},
});
</script>

<style lang="less">
@com-width: var(--ui-input-size-m);
@com-border-radius-m: var(--ui-border-radius-m);
@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

// Padding
@com-map-padding: var(--ui-map-padding);
@com-space-xs: var(--ui-space-xs);

// Colors
@com-color-surface: var(--ui-color-surface);
@com-color-border: var(--ui-color-border);

// Box shadow
@com-bs-1: var(--ui-bs-1);

.component-ui-map-zoom {
	position: absolute;
	right: @com-map-padding;
	bottom: @com-map-padding;

	width: @com-width;
	height: calc(calc(@com-width * 2) + 1);

	background: @com-color-surface;
	box-shadow: @com-bs-1;
	border-radius: @com-border-radius-m;

	.prepend {
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		margin-bottom: @com-space-xs;
	}

	.component-ui-button {
		height: @com-width;

		// Same look as device-zoom-switch icon: black, 0.6 opacity, ~2px line, full opacity on hover
		svg {
			transition: opacity @com-ani-time @com-ani-ease;
			opacity: 0.6;

			display: block;
			width: 20px;
			height: 20px;

			fill: none;
			stroke: #000;
			stroke-width: 2.4; // 2px at 20px size
			stroke-linecap: round;
		}

		&:hover svg,
		&:focus-visible svg {
			opacity: 1;
		}
	}

	// Hover background is painted on the button itself, so round the button, not only .button-bg
	.component-ui-button.plus {
		border-radius: @com-border-radius-m @com-border-radius-m 0 0;
	}

	.component-ui-button.minus {
		border-radius: 0 0 @com-border-radius-m @com-border-radius-m;
	}

	.separator {
		border-bottom: 1px solid @com-color-border;
	}
}
</style>
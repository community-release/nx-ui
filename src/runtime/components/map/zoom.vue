<template>
	<div class="component-ui-map-zoom">
		<div class="prepend"><slot /></div>
		<ui-button @click="store.zoomIn" class="plus" color="gray" block variant="flat" size="small" shape="square">+</ui-button>
		<div class="separator"></div>
		<ui-button @click="store.zoomOut" class="minus" color="gray" block variant="flat" size="small" shape="square">-</ui-button>
	</div>
</template>

<script setup>
const props = defineProps(['store']);
</script>

<style lang="less">
@com-width: var(--ui-input-height-default);
@com-border-radius-default: var(--ui-border-radius-default);

// Padding
@com-map-padding: var(--ui-map-padding);
@com-space-mini: var(--ui-space-mini);

// Colors
@com-color-surface: var(--ui-color-surface);
@com-color-border: var(--ui-color-border);

// Box shadow
@com-bs-1: var(--ui-bs-1);

// Font-size
@com-text-large: var(--ui-text-large);

.component-ui-map-zoom {
	position: absolute;
	right: @com-map-padding;
	bottom: @com-map-padding;

	width: @com-width;
	height: calc(calc(@com-width * 2) + 1);

	background: @com-color-surface;
	box-shadow: @com-bs-1;
	border-radius: @com-border-radius-default;

	.prepend {
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
		margin-bottom: @com-space-mini;
	}

	.component-ui-button {
		height: @com-width;
		font-size: @com-text-large;
	}

	.component-ui-button.plus .button-bg {
		border-top-left-radius: @com-border-radius-default;
		border-top-right-radius: @com-border-radius-default;
	}

	.component-ui-button.minus .button-bg {
		border-bottom-left-radius: @com-border-radius-default;
		border-bottom-right-radius: @com-border-radius-default;
	}

	.separator {
		border-bottom: 1px solid @com-color-border;
	}
}
</style>
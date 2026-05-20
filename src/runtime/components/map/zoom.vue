<template>
	<div class="component-ui-map-zoom">
		<div class="prepend"><slot /></div>
		<ui-button @click="store.zoomIn" class="plus" color="gray" block variant="flat" size="s" shape="square">+</ui-button>
		<div class="separator"></div>
		<ui-button @click="store.zoomOut" class="minus" color="gray" block variant="flat" size="s" shape="square">-</ui-button>
	</div>
</template>

<script setup>
const props = defineProps(['store']);
</script>

<style lang="less">
@com-width: var(--ui-input-height-m);
@com-border-radius-m: var(--ui-border-radius-m);

// Padding
@com-map-padding: var(--ui-map-padding);
@com-space-xs: var(--ui-space-xs);

// Colors
@com-color-surface: var(--ui-color-surface);
@com-color-border: var(--ui-color-border);

// Box shadow
@com-bs-1: var(--ui-bs-1);

// Font-size
@com-text-2xl: var(--ui-text-2xl);

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
		font-size: @com-text-2xl;
	}

	.component-ui-button.plus .button-bg {
		border-top-left-radius: @com-border-radius-m;
		border-top-right-radius: @com-border-radius-m;
	}

	.component-ui-button.minus .button-bg {
		border-bottom-left-radius: @com-border-radius-m;
		border-bottom-right-radius: @com-border-radius-m;
	}

	.separator {
		border-bottom: 1px solid @com-color-border;
	}
}
</style>
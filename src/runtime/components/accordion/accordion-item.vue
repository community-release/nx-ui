<template>
	<section class="component-ui-accordion-item" 
		:class="{'tag-active': accordionData.open.value === id, 'tag-icon': accordionData.haveIcon}"
		:data-id="id"
	>
		<div class="header" @click="accordionData.onClick(id)">
			<i class="icon"></i>
			<div class="title">{{ title }}</div>
			<div class="btn-toggle"></div>
		</div>
		<div class="text">
			<div><slot /></div>
		</div>
	</section>
</template>

<script setup>
// Import
	import { inject } from 'vue'

// Data
	const accordionData = inject('accordionData');
	const props = defineProps({
		title: String,
		text: String,
	});
	const id = accordionData.counter.value++;
</script>

<style lang="less">
@import (less) '../styles/components.less';

// Misc
@com-icon-size: 30px;
@com-icon-size-small: 26px;
@com-btn-size: 20px;
@com-btn-width: 2px;
@com-btn-padding: 40px;
@com-btn-padding-small: 35px;

@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

@com-text-line-height: var(--ui-text-line-height);

// Padding
@com-space-default: var(--ui-space-default);
@com-space-small: var(--ui-space-small);
@com-space-mini: var(--ui-space-mini);

// Colors
@com-color-border: var(--ui-color-border);
@com-color-header-text: var(--ui-color-header-text);

// Text
@com-text-medium: var(--ui-text-medium);
@com-text-default: var(--ui-text-default);

// Font
@com-font-header: var(--ui-font-header);

.component-ui-accordion-item {
	--ui-accordion-icon-size: 0;
	--ui-accordion-btn-padding: @com-btn-padding;

	padding-bottom: @com-space-small;
	margin-top: @com-space-small;
	border-bottom: 1px solid @com-color-border;
	font-size: @com-text-medium;

	.header {
		position: relative;
		padding: @com-space-small var(--ui-accordion-btn-padding) @com-space-small calc(var(--ui-accordion-icon-size) + @com-space-default);
		margin-bottom: @com-space-mini;
		cursor: pointer;
	}

	.icon,
	.btn-toggle {
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		width: @com-icon-size;
		height: @com-icon-size;
		line-height: @com-icon-size;
		text-align: center;
	}

	.icon {
		left: 0;
		background-position: center;
		background-size: contain;
	}

	.title {
		font-family: @com-font-header;
		font-weight: 600;
		color: @com-color-header-text;
	}

	.btn-toggle {
		right: 0;

		&:before,
		&:after {
			content: '';

			transition: all @com-ani-time @com-ani-ease;
			transform-origin: center;
			position: absolute;
			background: @com-color-header-text;
		}

		// |
		&:before {
			top: (@com-icon-size/2) - (@com-btn-size / 2);
			left: (@com-icon-size/2) - (@com-btn-width / 2);
			width: @com-btn-width;
			height: @com-btn-size;
		}

		// —
		&:after {
			top: (@com-icon-size/2) - (@com-btn-width / 2);
			left: (@com-icon-size/2) - (@com-btn-size / 2);
			width: @com-btn-size;
			height: @com-btn-width;
		}
	}

	.text {
		transition: grid-template-rows @com-ani-time @com-ani-ease;
		display: grid;
		grid-template-rows: 0fr;
		line-height: @com-text-line-height;
		font-size: @com-text-default;

		div {
			overflow: hidden;
		}
	}


	&:last-child {
		border-bottom: none;
	}

	// Active state
	&.tag-active {
		.text {
			grid-template-rows: 1fr;
		}

		.btn-toggle {
			&:before,
			&:after {
				transform: rotate(90deg);
			}
			&:after {
				opacity: 0;
			}
		}
	}

	&.tag-icon {
		--ui-accordion-icon-size: @com-icon-size;
	}
}

@media only screen and (max-width: 500px) {
	.component-ui-accordion-item {
		&.tag-icon {
			--ui-accordion-icon-size: @com-icon-size-small;
		}
		--ui-accordion-btn-padding: @com-btn-padding-small;

		font-size: @com-text-default;

		.icon {
			width: 26px;
			height: 26px;
		}
	}
}
</style>
<template>
	<component class="component-ui-card" :is="cardIs" :to="to">
		<div class="ui-card-header" v-if="$slots?.header">
			<slot name="header"></slot>
		</div>
		<div class="ui-card-image" v-if="image">
			<img :src="image" :alt="imageAlt">
		</div>
		<div class="ui-card-icon" v-if="icon">
			<img :src="icon">
			<component v-if="iconTitle" :is="iconTitleIs" :to="iconLink" target="_blank" class="ui-card-icon-title">
				{{ iconTitle }}
			</component>
		</div>
		<component v-if="title" :is="titleUrl ? 'a' : 'div'" class="ui-card-title" :href="titleUrl">
			<strong>{{ title }}</strong>
			<div v-if="subtitle" class="ui-card-subtitle">{{ subtitle }}</div>
		</component>
		<div class="ui-card-content" v-if="$slots?.default">
			<slot></slot>
		</div>
		<div class="ui-card-footer" v-if="$slots?.footer">
			<slot name="footer"></slot>
		</div>
	</component>
</template>

<script setup>
// Imports
import { resolveComponent } from 'vue';

// Data
const props = defineProps({
	to: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	imageAlt: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: ''
	},
	iconTitle: {
		type: String,
		default: ''
	},
	iconLink: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	subtitle: {
		type: String,
		default: ''
	},
	titleUrl: {
		type: String,
		default: ''
	},
	href: {
		type: String,
		default: ''
	},
});

const cardIs = (props.to || props.href) ? 'NuxtLink' : 'div';
const iconTitleIs = props.iconLink ? 'NuxtLink' : 'b';
</script>

<style lang="less">
// Variables
@com-border-radius-default: var(--ui-border-radius-big);

// Text size
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

// Font family
@com-font-header: var(--ui-font-header);

// Font size
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

// Color
@com-color-header-text: var(--ui-color-header-text);
@com-color-gray-text: var(--ui-color-gray-text);
@com-color-surface: var(--ui-color-surface);
@com-color-text: var(--ui-color-text);
@com-color-primary: var(--ui-color-primary);

// Padding
@com-space-big: var(--ui-space-big);
@com-space-medium: var(--ui-space-medium);
@com-space-default: var(--ui-space-default);
@com-space-small: var(--ui-space-small);
@com-space-micro: var(--ui-space-micro);
@com-space-mini: var(--ui-space-mini);

.component-ui-card {
	--ui-card-padding: @com-space-default;

	position: relative;

	color: @com-color-header-text;
	background: @com-color-surface;
	border-radius: @com-border-radius-default;

	.ui-card-image {
		padding: @com-space-big @com-space-big @com-space-mini @com-space-big;
		overflow: hidden;
		border-top-left-radius: @com-border-radius-default;
		border-top-right-radius: @com-border-radius-default;
	}

	.ui-card-icon {
		display: grid;
		grid-template-columns: 50px auto;
		gap: @com-space-default;
		align-items: center;
		padding: var(--ui-card-padding) 0 0 30px;
		height: 80px;

		font-family: @com-font-header;

		img {
			width: 100%;
			max-width: 50px;
			max-height: 50px;
		}

		a, b {
			padding-right: @com-space-mini;
			font-weight: 600;
			color: @com-color-header-text;
		}
	}

	.ui-card-title {
		display: block;
		padding: var(--ui-card-padding) var(--ui-card-padding) @com-space-micro var(--ui-card-padding);
		font-family: @com-font-header;
		font-size: @com-text-default;
		color: @com-color-header-text;

		strong {
			position: relative;

			&:before {
				content: '';

				position: absolute;
				bottom: 22%;
				right: -8px;

				width: 4px;
				height: 4px;
				border-radius: 50%;

				background: @com-color-primary;
			}
		}

		.ui-card-subtitle {
			font-size: @com-text-small;
			color: @com-color-gray-text;
		}
	}

	.ui-card-content {
		padding: 0 var(--ui-card-padding) var(--ui-card-padding) var(--ui-card-padding);
		line-height: 1.5;
		font-size: @com-text-small;
		color: @com-color-text;
	}
}
</style>
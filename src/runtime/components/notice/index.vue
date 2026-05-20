<template>
	<section class="component-ui-notice">
		<transition-group name="list">
			<div v-for="item in items" :key="item.id" class="component-ui-notice-wrapper">
				<ui-notice-item 
					:id="item.id" 
					:duration="item.duration" 
					@remove="store.remove(item.id)"
				>
					<component :is="item.templateComponent" v-bind="item.templateProps"></component>
				</ui-notice-item>
			</div>
		</transition-group>
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUINoticeStore } from './store';
import UiNoticeItem from './notice-item.vue';

const store = useUINoticeStore();
const { items } = storeToRefs(store);
</script>

<style lang="less">
@com-space-m: var(--ui-space-m);

.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
	display: grid;
	grid-template-rows: 1fr;
}

.list-enter-from,
.list-leave-to {
	grid-template-rows: 0fr;

	.component-ui-notice-item {
		opacity: 0;
		margin: 0;
		padding: 0;
	}
}

.component-ui-notice {
	transform: translateX(-50%);
	position: fixed;
	bottom: @com-space-m;
	left: 50%;
	padding: 0 @com-space-m;

	width: 500px;
	max-width: 100%;

	.component-ui-notice-wrapper {
		.component-ui-notice-item {
			overflow: hidden;
		}
	}
}
</style>
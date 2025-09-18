<template>
	<div class="impulse-example" @click="onClick">
		<ui-impulse-indicator :impulse="impulse"  />
		<span>👇</span>
	</div>
</template>

<script setup>
const impulse = ref(false);

function onClick(e) {
	impulse.value = {
		left		: e.layerX,
		top			: e.layerY,
		background	: 'var(--color-primary)',
		duration	: '1s',
		ease		: 'cubic-bezier(0.85, 0, 0.15, 1)',
	};
}
</script>

<style lang="less">
.impulse-example {
	display: grid;
	place-items: center;

	position: relative;
	height: 100px;
	
	font-size: var(--text-medium);
	font-family: var(--font-header);

	color: var(--color-text-on-primary);
	background: var(--color-surface);
	border-radius: var(--border-radius);

	cursor: pointer;
}
</style>
<template>
	<div class="example-button-colors">
		<div></div>
		<div v-for="variant in variants" :key="variant" class="head">{{ variant }}</div>

		<template v-for="color in colors" :key="color">
			<div class="head">{{ color }}</div>
			<div v-for="variant in variants" :key="variant">
				<ui-button :color="color" :variant="variant">Button</ui-button>
			</div>
		</template>
	</div>
</template>

<script setup>
const colors = ['primary', 'secondary', 'gray', 'red', 'surface', 'neutral', 'bg'];
const variants = ['solid', 'flat', 'outline'];
</script>

<style>
.example-button-colors {
	display: grid;
	grid-template-columns: auto repeat(3, 1fr);
	align-items: center;
	gap: var(--ui-space-xs) var(--ui-space-m);

	.head {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-s);
	}
}
</style>

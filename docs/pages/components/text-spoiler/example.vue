<template>
	<ui-grid grid-template-columns="1fr">
		<div>
			<helper-typography>
				<strong>Without model</strong>
			</helper-typography>
			<ui-text-spoiler showText="Show all" hideText="Hide" :length="length" :text="text" />
		</div>

		<div>
			<helper-typography>
				<strong>Using model</strong>
			</helper-typography>
			<ui-checkbox v-model="show">Toggle</ui-checkbox>
			<ui-text-spoiler showText="Show all" hideText="Hide" v-model="show" :length="length" :text="text" />
		</div>
	</ui-grid>
</template>

<script setup>
const show = ref(true);
const length = ref(50);
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>
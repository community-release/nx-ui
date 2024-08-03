<template>
	<ui-label text="Text">
		<ui-input v-model="value"></ui-input>
	</ui-label>
</template>

<script setup>
const value = ref('Hello world');
</script>
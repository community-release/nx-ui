<template>
	<ui-grid grid-template-columns="1fr 1fr">
		<div>
			<ui-label text="Text" :required="required">
				<ui-input v-model="value"></ui-input>
			</ui-label>
		</div>
		<div>
			<ui-label text="props">
				<ui-checkbox v-model="required">required</ui-checkbox>
			</ui-label>
		</div>
	</ui-grid>
</template>

<script setup>
const value = ref('Hello world');
const required = ref(false);
</script>
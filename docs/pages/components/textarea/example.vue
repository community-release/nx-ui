<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-label text="Message" label-for="textarea-example" :required="required">
				<ui-textarea 
					input-id="textarea-example"
					placeholder="Enter text..."
					v-model="value" 
					:disabled="disabled" 
					:required="required" 
					:shape="shape"
					:resize="resize"
				>
				</ui-textarea>
			</ui-label>
		</div>
		<ui-grid>
			<ui-select v-model="shape" :options="shapeList" label="shape"></ui-select>
			<ui-select v-model="resize" :options="resizeList" label="resize"></ui-select>
			<ui-checkbox v-model="required">required</ui-checkbox>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const value = ref('');
const disabled = ref(false);
const required = ref(false);

const shape = ref('');
const shapeList = ref([
	{name: 'default', value: ''},
	{name: 'round-square', value: 'round-square'},
	{name: 'square', value: 'square'},
]);

const resize = ref('');
const resizeList = ref([
	{name: 'on (allow vertical resize)', value: 'on'},
	{name: 'both (allow both size resize)', value: 'both'},
	{name: 'off', value: 'off'},
]);
</script>
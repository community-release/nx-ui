<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-label text="Text" label-for="input-example" :required="required">
				<ui-input 
					input-id="input-example"
					placeholder="Enter text"
					v-model="value"
					:shape="shape"
					:size="size"
					:disabled="disabled"
					:required="required"
					:error="error"

					@blur="console.log('blur')"
					@focus="console.log('focus')"

					input.aria-autocomplete="list"
					@keydown.down="handleInputKeydown"
				>
				</ui-input>
			</ui-label>

		</div>

		<ui-grid>
			<ui-select v-model="size" :options="sizeList" label="size"></ui-select>
			<ui-select v-model="shape" :options="shapeList" label="shape"></ui-select>
			<ui-checkbox v-model="required">required</ui-checkbox>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
			<ui-checkbox v-model="error">error</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const value = ref('');
const disabled = ref(false);
const required = ref(false);
const error = ref(false);

const size = ref('default');
const sizeList = ref([
	{name: 'large', value: 'large'},
	{name: 'big', value: 'big'},
	{name: 'medium', value: 'medium'},
	{name: 'default', value: 'default'},
	{name: 'small', value: 'small'},
	{name: 'mini', value: 'mini'},
]);

const shape = ref('');
const shapeList = ref([
	{name: 'default', value: ''},
	{name: 'round', value: 'round'},
	{name: 'round-square', value: 'round-square'},
	{name: 'square', value: 'square'},
]);

function handleInputKeydown(e) {
	console.log('handleInputKeydown', e);
}
</script>
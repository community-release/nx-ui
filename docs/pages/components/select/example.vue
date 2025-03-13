<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<ui-grid>
			<ui-label text="With label" label-for="select-example" :required="required">
				<ui-select 
					v-model="city"
					input-id="select-example"
					:options="citiesList" 
					label="Cities"
					:disabled="disabled"
					:required="required"
				></ui-select>
			</ui-label>

			<ui-label text="Without label" label-for="select-example2" :required="required">
				<ui-select
					v-model="city" 
					input-id="select-example2"
					:options="citiesList" 
					:disabled="disabled"
					:required="required"
				></ui-select>
			</ui-label>
		</ui-grid>
		<ui-grid>
			<ui-label text="Props" fieldset>
				<ui-grid>
					<ui-checkbox v-model="required">required</ui-checkbox>
					<ui-checkbox v-model="disabled">disabled</ui-checkbox>
				</ui-grid>
			</ui-label>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const city = ref('1');
const citiesList = ref([
	{name: 'Tokyo, Japan', value: '1'},
	{name: 'Delhi, India', value: '2'},
	{name: 'Shanghai, China', value: '3'},
	{name: 'São Paulo, Brazil', value: '4'},
	{name: 'Mumbai, India', value: '5'},
]);

const required = ref(false);
const disabled = ref(false);
</script>
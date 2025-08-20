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
					:error="error"
				></ui-select>
			</ui-label>

			<ui-label text="Without label" label-for="select-example2" :required="required">
				<ui-select
					v-model="city" 
					input-id="select-example2"
					:options="citiesList" 
					:disabled="disabled"
					:required="required"
					:error="error"
				></ui-select>
			</ui-label>

			<ui-label text="With groups" label-for="select-example3" :required="required">
				<ui-select
					v-model="city2" 
					input-id="select-example3"
					label="Cities"
					:options="citiesByCountriesList" 
					:disabled="disabled"
					:required="required"
					:error="error"
					with-groups
				></ui-select>
			</ui-label>
		</ui-grid>
		<ui-grid>
			<ui-label text="Props" isLegend>
				<ui-grid>
					<ui-checkbox v-model="required">required</ui-checkbox>
					<ui-checkbox v-model="disabled">disabled</ui-checkbox>
					<ui-checkbox v-model="error">error</ui-checkbox>
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

const city2 = ref('1');
const citiesByCountriesList = ref([
	{
		name: 'Japan',
		items: [
			{name: 'Tokyo, Japan', value: '1'},
		]
	},
	{
		name: 'India',
		items: [
			{name: 'Delhi, India', value: '2'},
			{name: 'Mumbai, India', value: '5'},
		]
	},
	{
		name: 'China',
		items: [
				{name: 'Shanghai, China', value: '3'},
		]
	},
	{
		name: 'Brazil',
		items: [
			{name: 'São Paulo, Brazil', value: '4'},
		]
	},
]);

const required = ref(false);
const disabled = ref(false);
const error = ref(false);
</script>
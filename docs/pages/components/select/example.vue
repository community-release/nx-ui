<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<ui-grid>
			<ui-label text="With label">
				<ui-select 
					v-model="city" 
					:options="citiesList" 
					label="Cities"
					:disabled="disabled"
				></ui-select>
			</ui-label>

			<ui-label text="Without label">
				<ui-select 
					v-model="city" 
					:options="citiesList" 
					:disabled="disabled"
				></ui-select>
			</ui-label>
		</ui-grid>
		<ui-grid>
			<ui-label text="props">
				<ui-checkbox v-model="disabled">disabled</ui-checkbox>
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

const disabled = ref(false);
</script>
<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-grid :gridTemplateColumns="{'default': gridTemplateColumns, '1200': '1fr'}" :gap="`var(--ui-space-${gap})`">
				<ui-button shape="square" block>a</ui-button>
				<ui-button shape="square" block>b</ui-button>
				<ui-button shape="square" block>c</ui-button>
				<ui-button shape="square" block>d</ui-button>
				<ui-button shape="square" block>e</ui-button>
				<ui-button shape="square" block>f</ui-button>
			</ui-grid>
		</div>
		<ui-grid>
			<ui-select v-model="gap" :options="gapList" label="gap"></ui-select>
			<ui-select v-model="gridTemplateColumns" :options="gridTemplateColumnsList" label="grid-template-columns"></ui-select>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const gap = ref('m');
const gapList = ref([
	{name: '2xl', value: '2xl'},
	{name: 'xl', value: 'xl'},
	{name: 'l', value: 'l'},
	{name: 'm', value: 'm'},
	{name: 's', value: 's'},
	{name: 'xs', value: 'xs'},
]);

const gridTemplateColumns = ref('1fr 1fr 1fr');
const gridTemplateColumnsList = ref([
	{name: '1fr 1fr 1fr 1fr', value: '1fr 1fr 1fr 1fr'},
	{name: '1fr 1fr 1fr', value: '1fr 1fr 1fr'},
	{name: '1fr 1fr', value: '1fr 1fr'},
	{name: '1fr', value: '1fr'},
]);
</script>
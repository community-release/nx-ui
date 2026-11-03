<template>
	<ui-map
		height="50vh"
		max-height="600px"
		tilesStyle="https://tiles.openfreemap.org/styles/positron"
		:zoom="13"
		:coord="[24.106389, 56.948889]"
		:markers="markers"
	>
		<template #row="{ store }">
			<ui-map-zoom :store="store" />
		</template>
	</ui-map>
</template>

<script setup>
const markers = [
	{
		id: 'old-town',
		name: 'Old Town',
		address: 'Rātslaukums 1, Rīga',
		coord: [24.106389, 56.948889],
	},
	{
		id: 'central-market',
		name: 'Central Market',
		address: 'Nēģu iela 7, Rīga',
		coord: [24.114, 56.9436],
	},
];
</script>
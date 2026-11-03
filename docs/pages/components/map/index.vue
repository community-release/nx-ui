<template>
	<section id="page-ui-map">
		<section-title>ui-map</section-title>

		<component-preview title="Example" :example="ExampleRaw">
			<template #control>
				<ui-button
					v-for="(value, name) in tilesFilters"
					:key="name"
					:variant="name === tilesFilter ? 'solid' : 'outline'"
					size="s"
					@click="tilesFilter = name"
				>
					{{ name }}
				</ui-button>
			</template>
			<template #default>
				<div class="example-tiles-filter" :style="{ '--example-tiles-filter': tilesFilters[tilesFilter] }">
					<Example />
				</div>
			</template>
		</component-preview>

		<br><br>

		<helper-typography>
			<h3>Tiles filter</h3>
			<p>
				Map tiles are rendered in a separate layer with the <code>ui-map-tiles</code> class,
				so CSS filter can recolor tiles without affecting markers and clusters.
				Use the buttons above the example to try different filters.
			</p>
			<p>For the whole project set the filter in <code>ui.config.js</code>:</p>
			<pre>{{ configExample }}</pre>
			<p>For a single map use CSS:</p>
			<pre>{{ cssExample }}</pre>
			<p>Current filter:</p>
			<pre>{{ tilesFilters[tilesFilter] }}</pre>
		</helper-typography>
	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

const { t } = useI18n();

const tilesFilters = {
	'none': 'none',
	'gray-blue': 'grayscale(1) sepia(0.25) hue-rotate(180deg) saturate(1.6) brightness(1.04) contrast(0.95)',
	'grayscale': 'grayscale(1) brightness(1.05) contrast(0.9)',
	'sepia': 'sepia(0.6) saturate(0.8) brightness(1.02)',
	'dark': 'invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)',
};

const tilesFilter = ref('none');

const configExample = `componentsStyle: {
	map: {
		'tiles-filter': 'grayscale(1) sepia(0.25) hue-rotate(180deg) saturate(1.6)',
	},
},`;

const cssExample = `.my-map .ui-map-tiles {
	filter: grayscale(1);
}`;

useHead({
	title: t('breadcrumbs.map')
});
</script>

<style lang="less">
#page-ui-map {
	// Filter selected with buttons, applied only to this example map tiles
	.example-tiles-filter .component-ui-map .ui-map-tiles {
		filter: var(--example-tiles-filter);
	}
}
</style>
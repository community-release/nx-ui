<template>
	<section class="component-ui-map">
		<component :is="mapEngines[props.engine]" @initialized="emit('initialized', $event)">
			<slot :store="store"></slot>
			<div class="slot-row">
				<slot name="row" :store="store"></slot>
			</div>
		</component>
	</section>
</template>

<script setup>
import { watch, computed, defineAsyncComponent } from 'vue';
import { useMapStore } from './store';
import comProps from '#build/ui.map.mjs';

// // Data
const nuxtApp = useNuxtApp();
const store = useMapStore(nuxtApp.$pinia);
const emit = defineEmits(['initialized']);

const mapEngines = {
	openlayers: defineAsyncComponent(() => import(`./openlayers/index.vue`))
};

const props = defineProps({
	engine: {
		default: 'openlayers',
		type: String
	},
	height: {
		default: '400px',
		type: String
	},
	maxHeight: {
		default: 'none',
		type: String
	},
	coord: {
		default() { return [13.689167, 47.394167] }, // Riga
		type: Array,
	},
	zoom: {
		default: comProps.zoom,
		type: [Number, String],
	},
	zoomMin: {
		default: comProps.zoomMin,
		type: [Number, String],
	},
	zoomMax: {
		default: comProps.zoomMax,
		type: [Number, String],
	},
	deviceZoom: {
		default: false,
		type: Boolean
	},
	markers: {
		default: () => [],
		type: Array
	},
	disabledMarkers: {
		default: () => [],
		type: Array
	},
	markerImage: {
		default: '',
		type: String
	},
	markerActiveImage: {
		default: '',
		type: String
	},
	markerDisabledImage: {
		default: '',
		type: String
	},
	clusterColor: {
		default: comProps.clusterColor,
		type: String
	},
	disabledClusterColor: {
		default: comProps.disabledClusterColor,
		type: String
	},
});

store.coord = props.coord;
store.zoom = props.zoom;
store.zoomMin = props.zoomMin;
store.zoomMax = props.zoomMax;
store.deviceZoom = props.deviceZoom;
store.markers = props.markers;
store.markerImage = props.markerImage;
store.markerActiveImage = props.markerActiveImage;
store.markerDisabledImage = props.markerDisabledImage;
store.clusterColor = props.clusterColor;
store.disabledClusterColor = props.disabledClusterColor;

watch(() => props.disabledMarkers, (v) => {
	store.setDisabledMarkers(v);
}, {immediate: true});
</script>

<style lang="less">
@com-content-width: var(--ui-content-width);

@com-space-default: var(--ui-space-default);
@com-space-mini: var(--ui-space-mini);

.component-ui-map {
	--ui-map-padding: @com-space-default;

	position: relative;
	height: v-bind(height);
	max-height: v-bind(maxHeight);

	.component-ui-map-engine {
		position: absolute;
		inset: 0;
	}

	.slot-row {
		pointer-events: none; 

		position: relative;
		margin: 0 auto;
		padding: 0 @com-space-default;
		width: 100%;
		max-width: @com-content-width;
		min-width: 320px;

		height: 100%;

		* {
			pointer-events: auto; 
		}
	}
}

@media only screen and (max-width: 620px) {
	.component-ui-map {
		--ui-map-padding: @com-space-mini;
	}
}
</style>
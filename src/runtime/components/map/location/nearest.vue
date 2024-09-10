<template>
	<section class="component-ui-map-location-nearest" @click="handleClick">
		<i v-if="icon" class="icon" :class="[icon, loading ? 'tag-loading' : '']">
			<ui-loading :active="loading" />
		</i>
		<span class="label"><span>{{ label }}</span></span>
	</section>
</template>

<script setup>
// Import
	import { ref } from 'vue';
	import UiLoading from '../../loading.vue';
	import { useMapStore } from '../store';

// Data
	const props = defineProps({
		label: {
			required: true,
			type: String
		},
		icon: {
			required: true,
			type: String
		},
		locations: {
			required: true,
			type: Array
		},
	});
	const store = useMapStore();
	const loading = ref(false);
	let cachedPosition = null;
	let cachedTime = 0;

// Methods
	// Get distance between points
	function getDistance(p1, p2) {
		const dx = p1.coord[0] - p2.coord[0];
		const dy = p1.coord[1] - p2.coord[1];

		return Math.sqrt(dx * dx + dy * dy);
	}

	// Find nearest points
	function findNearestPoint(points, target) {
		if (points.length === 0) return [];
		
		// Calculate distances
		const pointsWithDistance = points.map(point => ({
			data: point,
			distance: getDistance(point, target)
		}));
		
		// Sort by distance
		pointsWithDistance.sort((a, b) => a.distance - b.distance);
		
		// Select the first n points
		return pointsWithDistance[0].data;
	}

	function getPosition() {
		return new Promise((res, rej) => {
			navigator.geolocation.getCurrentPosition(res, rej);
		});
	}

	async function handleClick() {
		try {
			// If cache not exist or it's older than 1 minute
			if (!cachedPosition || Date.now() - cachedTime > 60000) {
				loading.value = true;

				const pos = await getPosition();

				cachedPosition = [pos.coords.longitude, pos.coords.latitude];
				cachedTime = Date.now();

				store.setUserCoord(cachedPosition);
			}

			// Find nearest point
			const nearest = findNearestPoint(
				props.locations, 
				{ coord: cachedPosition }
			);

			// Set coord and zoom
			store.setCoord(nearest.coord, 2);
			store.setZoom(nearest?.zoom ? nearest.zoom : 14);
		} catch (err) {
			console.log('handleClick err', err);
		}

		store.setSelectedMarker(null);
		loading.value = false;
	}
</script>

<style lang="less">
@import url(../../styles/mixins.less);

@com-height: var(--ui-input-height-default);

@com-border-radius-default: var(--ui-border-radius-default);
@com-space-default: var(--ui-space-default);
@com-space-mini: var(--ui-space-mini);
@com-space-micro: var(--ui-space-micro);

@com-text-medium: var(--ui-text-medium);
@com-text-small: var(--ui-text-small);

@com-color-bg: var(--ui-color-bg);
@com-color-primary: var(--ui-color-primary);

@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

.component-ui-map-location-nearest {
	height: @com-height;
	background: @com-color-bg;
	border-radius: @com-border-radius-default;

	position: relative;
	display: flex;
	cursor: pointer;

	.icon {
		position: relative;
		flex: 0 0 38px;
		line-height: @com-height;
		font-size: @com-text-medium;
		color: @com-color-primary;

		.component-ui-loading {
			transform: translate3d(-50%, -50%, 0);
			position: absolute;
			top: 50%;
			left: 50%;
		}

		&:before {
			transition: opacity @com-ani-time @com-ani-ease;
		}

		&.tag-loading {
			&:before {
				opacity: 0;
			}
		}

	}

	.label {
		display: flex;
		padding-right: @com-space-micro;
		align-items: center;
		line-height: 1.1;
		font-size: @com-text-small;

		span {
			.mix-multiline-text-overflow(2);
		}
	}
}
</style>
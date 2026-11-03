import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createMapStore, disposeMapStore } from '../src/runtime/components/map/store.js';

describe('map store', () => {
	let pinia;

	beforeEach(() => {
		pinia = createPinia();
		setActivePinia(pinia);
	});

	it('each map has independent store', () => {
		const a = createMapStore('a');
		const b = createMapStore('b');

		a.zoom = 5;
		a.markers = [{ id: 1, coord: [24, 56] }];
		a.setSelectedMarker({ id: 1 });

		expect(b.zoom, 'zoom is shared between maps').toBe(8);
		expect(b.markers, 'markers are shared between maps').toEqual([]);
		expect(b.selectedMarker, 'selected marker is shared between maps').toBe(null);
		expect(a.$id, 'stores should have different ids').not.toBe(b.$id);
	});

	it('getters work per store', () => {
		const a = createMapStore('a');
		const b = createMapStore('b');

		a.markers = [{ id: 'x', coord: [24, 56] }];

		expect(a.getMarker('x'), 'marker is not found in own store').toEqual({ id: 'x', coord: [24, 56] });
		expect(b.getMarker('x'), 'marker is found in other map store').toBe(null);
	});

	it('disposed store state is removed from pinia', () => {
		const a = createMapStore('a');
		const id = a.$id;

		expect(id in pinia.state.value, 'store state is not registered').toBe(true);

		disposeMapStore(a);

		expect(id in pinia.state.value, 'store state is not removed').toBe(false);
		expect(createMapStore('a').zoom, 'recreated store should have default state').toBe(8);
	});
});

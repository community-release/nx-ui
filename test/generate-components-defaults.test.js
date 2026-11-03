import { describe, it, expect } from 'vitest';
import generateComponentsDefaults from '../src/utils/generateComponentsDefaults.js';

describe('generateComponentsDefaults', () => {
	it('map tiles filter is none by default', () => {
		const less = generateComponentsDefaults({});

		expect(less, 'default tiles filter is not set').toContain('@ui-map-tiles-filter: none;');
	});

	it('map tiles filter can be overridden from ui.config componentsStyle', () => {
		const filter = 'grayscale(1) sepia(0.25) hue-rotate(180deg)';
		const less = generateComponentsDefaults({
			componentsStyle: {
				map: { 'tiles-filter': filter }
			}
		});

		expect(less, 'tiles filter is not overridden').toContain(`@ui-map-tiles-filter: ${filter};`);
		expect(less, 'other map styles should keep defaults').toContain('@ui-map-user-position-color:');
	});
});

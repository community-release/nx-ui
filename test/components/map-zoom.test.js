import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/map/zoom.vue';
import UiButton from '../../src/runtime/components/button/index.vue';

describe('map zoom component', async () => {
	vi.mock('vue-router', () => {
		return {
			useRouter() {
				return {
					push: () => {}
				};
			}
		};
	});

	const store = {
		zoomIn: vi.fn(),
		zoomOut: vi.fn(),
	};

	const mountZoom = (props = {}) => mount(C, {
		props: { store, ...props },
		global: {
			components: { UiButton }
		}
	});

	test('Component is mounted', async () => {
		const wrapper = mountZoom();

		expect(wrapper.find('.component-ui-map-zoom').exists(), 'component root is not found').toBe(true);
	});

	test('default aria-labels', async () => {
		const wrapper = mountZoom();

		expect(wrapper.find('.plus').attributes('aria-label'), 'zoom in label is not set').toBe('Zoom in');
		expect(wrapper.find('.minus').attributes('aria-label'), 'zoom out label is not set').toBe('Zoom out');
	});

	test('dictionary', async () => {
		const wrapper = mountZoom({
			dictionary: { zoomIn: 'Tuvināt', zoomOut: 'Tālināt' }
		});

		expect(wrapper.find('.plus').attributes('aria-label'), 'zoom in label is not replaced').toBe('Tuvināt');
		expect(wrapper.find('.minus').attributes('aria-label'), 'zoom out label is not replaced').toBe('Tālināt');
	});

	test('buttons contain svg icons instead of text', async () => {
		const wrapper = mountZoom();

		for (const selector of ['.plus', '.minus']) {
			const button = wrapper.find(selector);

			expect(button.find('svg').exists(), `${selector} svg icon is not found`).toBe(true);
			expect(button.find('.slot-default').text(), `${selector} should not contain text`).toBe('');
		}
	});

	test('buttons call store zoom methods', async () => {
		const wrapper = mountZoom();

		await wrapper.find('.plus').trigger('click');
		await wrapper.find('.minus').trigger('click');

		expect(store.zoomIn, 'zoomIn is not called').toHaveBeenCalledOnce();
		expect(store.zoomOut, 'zoomOut is not called').toHaveBeenCalledOnce();
	});
});

import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import CLabel from '../../src/runtime/components/label/index.vue';
import CButton from '../../src/runtime/components/button/index.vue';

describe('label component', async () => {
	const wrapper = mount(CLabel, {
		slots: {
			default: CButton
		},
		props: {
			text: 'label text test',
			size: 'big',
			weight: '700'
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('label');
	});

	test('slot', async () => {
    	expect(html, 'component slot html is not found').toContain('button');
	});

	test('text', async () => {
    	expect(html, 'text is not set').toContain('label text test');
	});

	test('size', async () => {
    	expect(html, 'size is not set').toContain('big');
	});

	test('weight', async () => {
    	expect(html, 'weight is not set').toContain('700');
	});
});
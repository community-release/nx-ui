import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import CSpoiler from '../../src/runtime/components/spoiler.vue';
import CButton from '../../src/runtime/components/button/index.vue';

describe('spoiler component', async () => {
	const wrapper = mount(CSpoiler, {
		slots: {
			default: CButton
		},
		props: {
			showText: 'Show',
			hideText: 'Hide',
			modelValue: true
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('spoiler');
	});

	test('slot', async () => {
    	expect(html, 'component slot html is not found').toContain('button');
	});
 
	test('hideText', async () => {
    	expect(html, 'text is not set').toContain('Hide');
	});
});
import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import CTextSpoiler from '../../src/runtime/components/text-spoiler.vue';

describe('text-spoiler component', async () => {
	const wrapper = mount(CTextSpoiler, {
		props: {
			showText: 'Show',
			hideText: 'Hide',
			modelValue: true,
			text: 'lorem ipsum'
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('text-spoiler');
	});
 
	test('hideText', async () => {
    	expect(html, 'hideText is not set').toContain('Hide');
	});

	test('text', async () => {
    	expect(html, 'text is not set').toContain('lorem');
	});
});
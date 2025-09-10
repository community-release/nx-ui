import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import { ref } from 'vue';
import C from '../../src/runtime/components/typeahead-input/index.vue';

describe('typeahead-input component', async () => {
	const wrapper = mount(C, {
		props: {
			modelValue: 'A',
			options: [{value: 1, name: 'A'}, {value: 2, name: 'B'}, {value: 3, name: 'C'}],
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
		expect(html, 'component html is not found').toContain('typeahead-input');
	});
});

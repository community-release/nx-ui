import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import { ref } from 'vue';
import C from '../../src/runtime/components/file-input/index.vue';

describe('file-input component', async () => {
	const value = ref(null);

	const wrapper = mount(C, {
		props: {
			modelValue: value,
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
		expect(html, 'component html is not found').toContain('file-input');
	});
});

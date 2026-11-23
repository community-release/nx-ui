<template>
	<section ref="refEl" class="component-search">
		<i class="fas fa-search icon" aria-hidden="true"></i>
		<ui-typeahead-input
			v-model="query"
			:options="options"
			:dictionary="dictionary"
			placeholder="Search"
			input-id="docs-search"
			name="search"
			size="s"
			color="surface"
		/>
		<kbd class="shortcut">Ctrl K</kbd>
	</section>
</template>

<script setup>
import { useGeneralStore } from '~/stores/generalStore';

// Data
const { menuPages } = useGeneralStore();
const localePath = useLocalePath();

const refEl = ref(null);
const query = ref('');

const options = menuPages.map((page) => ({ name: page.label, value: page.url }));

const dictionary = {
	list: 'Pages list',
	clear: 'Clear',
	close: 'Close',
	submit: 'Ok',
	itemsFound: 'Pages found',
	noItemsFound: 'No pages found',
};

// Methods
const focus = () => {
	refEl.value?.querySelector('input')?.focus();
};

const handleKeydown = (e) => {
	if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
		e.preventDefault();
		focus();
	}
};

// Hooks
// Typeahead emits option name on select, open the page when name matches an option
watch(query, (value) => {
	const option = options.find((item) => item.name === value);

	if (option) {
		navigateTo(localePath(option.value));
		query.value = '';
		refEl.value?.querySelector('input')?.blur();
	}
});

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
});
</script>

<style lang="less">
.component-search {
	position: relative;
	width: 280px;

	// Search needs only input and clear button: hide typeahead list toggle and submit button
	.component-ui-typeahead-input .component-ui-typeahead-input-grid > .component-ui-button,
	.component-ui-typeahead-input .component-ui-input .slot-prepend {
		display: none;
	}

	.component-ui-typeahead-input .component-ui-input input {
		padding-left: 34px;
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 12px;
		z-index: 1;
		transform: translateY(-50%);
		font-size: var(--text-xs);
		color: var(--color-muted-text);
		pointer-events: none;
	}

	.shortcut {
		position: absolute;
		top: 50%;
		right: calc(var(--input-size-s) + 4px);
		transform: translateY(-50%);
		padding: 2px 6px;
		font-family: inherit;
		font-size: var(--text-xs);
		line-height: 1.2;
		color: var(--color-muted-text);
		border: 1px solid var(--color-border-bolder);
		border-radius: 4px;
		background: var(--color-bg);
		pointer-events: none;
	}

	&:focus-within .shortcut {
		display: none;
	}
}
</style>

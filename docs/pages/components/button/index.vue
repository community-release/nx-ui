<template>
	<section>
		<section-title>ui-button</section-title>

		<lazy-component-preview title="Example" :example="ExampleRaw">
			<template #description>
				ui-button usage example
			</template>
			<template #default>
				<Example />
			</template>
		</lazy-component-preview>

		<br><br>

		<helper-typography>
			<h3>Prepend and append</h3>
			<p>Use prepend and append slots to put icons or extra content before and after the button text</p>
		</helper-typography>
		<br>
		<lazy-component-preview title="Example (slots)" :example="ExampleSlotsRaw">
			<template #default>
				<ExampleSlots />
			</template>
		</lazy-component-preview>

		<br><br>

		<helper-typography>
			<h3>Colors</h3>
			<p>All colors from ui config in every variant</p>
		</helper-typography>
		<br>
		<lazy-component-preview title="Example (colors)" :example="ExampleColorsRaw">
			<template #default>
				<ExampleColors />
			</template>
		</lazy-component-preview>
	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

import ExampleSlotsRaw from './exampleSlots.vue?raw';
import ExampleSlots from './exampleSlots.vue';

import ExampleColorsRaw from './exampleColors.vue?raw';
import ExampleColors from './exampleColors.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.button')
});
</script>
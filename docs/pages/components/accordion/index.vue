<template>
	<section>
		<section-title>ui-accordion</section-title>

		<helper-typography>
			<h3>As props</h3>
			<p>You can pass accordion items as prop</p>
		</helper-typography>
		<br>
		<component-preview title="Example (props)" :example="ExamplePropsRaw">
			<template #default>
				<ExampleProps />
			</template>
		</component-preview>

		<br><br>

		<helper-typography>
			<h3>As slot</h3>
			<p>Or you can pass them as components</p>
		</helper-typography>
		<br>
		<component-preview title="Example (slot)" :example="ExampleSlotRaw">
			<template #default>
				<ExampleSlot />
			</template>
		</component-preview>
	</section>
</template>

<script setup>
import ExamplePropsRaw from './exampleProps.vue?raw';
import ExampleProps from './exampleProps.vue';

import ExampleSlotRaw from './exampleSlot.vue?raw';
import ExampleSlot from './exampleSlot.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.accordion')
});
</script>
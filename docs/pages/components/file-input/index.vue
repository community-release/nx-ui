<template>
	<section>
		<section-title>ui-file-input</section-title>

		<component-preview title="Example" :example="ExampleRaw">
			<template #description>
				<helper-typography>
					<p>
						File input component example.
					</p>
				</helper-typography>
			</template>
			<template #default>
				<Example />
			</template>
		</component-preview>
	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.filter')
});
</script>
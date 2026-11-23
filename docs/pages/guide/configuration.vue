<template>
	<section>
		<section-title>Configuration</section-title>

		<helper-typography>
			<p>Module options are set with the <code>ui</code> key in <code>nuxt.config</code>:</p>
			<Shiki lang="javascript" :code="configCode" />

			<h3>style</h3>
			<p>
				Global style values. Each key becomes a CSS variable with the <code>--ui-</code> prefix,
				for example <code>color-primary</code> becomes <code>--ui-color-primary</code>.
				Values that are not set are taken from defaults.
			</p>
			<Shiki lang="javascript" :code="styleCode" />

			<h3>componentsStyle</h3>
			<p>
				Style values of a single component.
				Available for: <code v-for="(name, i) of componentsWithStyle" :key="name">{{ name }}<template v-if="i < componentsWithStyle.length - 1">, </template></code>.
			</p>
			<Shiki lang="javascript" :code="componentsStyleCode" />

			<h3>componentsProps</h3>
			<p>
				Default props of a component for the whole project.
				Available for: <code v-for="(name, i) of componentsWithProps" :key="name">{{ name }}<template v-if="i < componentsWithProps.length - 1">, </template></code>.
				Unknown component or prop is reported in console.
			</p>
			<Shiki lang="javascript" :code="componentsPropsCode" />
		</helper-typography>
	</section>
</template>

<script setup>
import defaultComponentsStyle from '../../../src/default.components';

const { t } = useI18n();

// Components that can be configured: style defaults and props.json files of the library
const componentsWithStyle = Object.keys(defaultComponentsStyle());
const componentsWithProps = Object.keys(import.meta.glob('../../../src/runtime/components/*/props.json'))
	.map((file) => file.split('/').at(-2));

const configCode = `export default defineNuxtConfig({
	modules: [
		'@community-release/nx-ui',
	],

	ui: {
		style: {},
		componentsStyle: {},
		componentsProps: {},
	},
});`;

const styleCode = `ui: {
	style: {
		'color-primary': '#009255',
		'border-radius-m': '9px',
		'font-text': 'Roboto, sans-serif',
	},
}`;

const componentsStyleCode = `ui: {
	componentsStyle: {
		map: {
			'user-position-color': 'var(--color-primary)',
		},
	},
}`;

const componentsPropsCode = `ui: {
	componentsProps: {
		button: {
			shape: 'round-square',
		},
	},
}`;

useHead({
	title: t('breadcrumbs.configuration')
});
</script>

<template>
	<section class="component-lang-switcher">
		<nuxt-link 
			v-for="locale in locales" 
			:key="locale.code"
			:to="$switchLocalePath(locale.code)"
		>
			{{ locale.code }}
		</nuxt-link>
	</section>
</template>

<script setup>
	const { locale, locales } = useI18n();
	const $switchLocalePath = useSwitchLocalePath();

	watch(locale, (v) => {
		console.log('watch', v);
	});
</script>

<style lang="less">
.component-lang-switcher {
	font-size: var(--text-s);

	a {
		opacity: 0.7;
		text-transform: uppercase;
		color: var(--color-text);

		+ a {
			margin-left: @space-xs;
		}

		&.router-link-active {
			opacity: 1;
			font-weight: bold;
		}
	}
}
</style>
<template>
	<button
		type="button"
		class="component-theme-switcher"
		aria-label="Toggle dark theme"
		@click="toggle"
	>
		<span class="thumb">
			<!-- Both icons are rendered, CSS shows the one for current theme (theme is unknown on server) -->
			<i class="fas fa-sun icon-light"></i>
			<i class="fas fa-moon icon-dark"></i>
		</span>
	</button>
</template>

<script setup>
const colorMode = useColorMode();

const toggle = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style lang="less">
.component-theme-switcher {
	position: relative;
	display: block;
	width: 40px;
	height: 22px;
	padding: 0;
	border: 1px solid var(--color-border-bolder);
	border-radius: 11px;
	background: var(--color-surface);
	cursor: pointer;
	.mix-disable-tap-highlight();

	.thumb {
		position: absolute;
		top: 1px;
		left: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		font-size: 10px;
		color: var(--color-text);
		border-radius: 50%;
		background: var(--color-bg);
		box-shadow: var(--bs-0);
		transition: transform 0.2s;
	}

	.icon-dark {
		display: none;
	}

	&:hover .thumb {
		color: var(--color-primary-text);
	}
}

html.theme-dark .component-theme-switcher {
	.thumb {
		transform: translateX(18px);
	}

	.icon-light {
		display: none;
	}

	.icon-dark {
		display: inline;
	}
}
</style>

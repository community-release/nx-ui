<template>
	<footer>
		{{ runtimeConfig.version }}
	</footer>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

</script>

<style lang="less">
footer {
	padding: var(--space-l);
	text-align: center;
}
</style>
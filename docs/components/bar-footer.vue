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
	padding: var(--space-medium);
	text-align: center;
}
</style>
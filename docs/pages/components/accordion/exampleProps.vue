<template>
	<div>
		<ui-accordion 
			icon="/icons/question.svg" 
			icon-dark="/icons/question-dark.svg" 
			:list="list" 
			@itemClick="handleClick"
		></ui-accordion>
	</div>
</template>

<script setup>
const list = [
	{
		"title": "Lorem ipsum...",
		"text": "<b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Nulla commodo mauris quis nisl tristique, in varius lorem consequat."
	},
	{
		"title": "Dolor sit amet...",
		"text": "Dolor sit amet, consectetur adipiscing elit. Ut fermentum sapien et leo molestie, in commodo enim dictum."
	},
	{
		"title": "Consectetur adipiscing...",
		"text": "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
	},
];

function handleClick(id) {
	console.log('handleClick', id);
}
</script>
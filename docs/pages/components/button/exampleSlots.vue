<template>
	<div class="example-button-slots">
		<!-- Icon before text -->
		<ui-button variant="outline">
			<template #prepend>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l-7-7l7-7m7 7H5"/></svg>
			</template>
			Back
		</ui-button>

		<!-- Icon after text -->
		<ui-button>
			Next
			<template #append>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/></svg>
			</template>
		</ui-button>

		<!-- Both slots: icon and extra text -->
		<ui-button color="secondary">
			<template #prepend>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"/></svg>
			</template>
			Download
			<template #append>
				<small>12 MB</small>
			</template>
		</ui-button>

		<!-- Dropdown-like button -->
		<ui-button color="surface" variant="flat">
			Options
			<template #append>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>
			</template>
		</ui-button>

		<!-- Small size -->
		<ui-button size="s" shape="round">
			<template #prepend>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5v14"/></svg>
			</template>
			Add item
		</ui-button>

		<!-- Large size with icon bigger than text -->
		<ui-button size="l" color="red">
			<template #prepend>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
			</template>
			Like
		</ui-button>

		<!-- Icon only -->
		<ui-button shape="circle" aria-label="Like">
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
		</ui-button>
	</div>
</template>

<style>
.example-button-slots {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--ui-space-xs);
}
</style>

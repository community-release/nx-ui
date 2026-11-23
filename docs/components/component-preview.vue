<template>
	<section class="component-preview">
		<div class="component-preview--header">
			<div class="component-preview--tabs" role="tablist">
				<button
					v-for="tab of tabs"
					:key="tab.id"
					type="button"
					role="tab"
					class="tab"
					:class="{ 'tag-active': activeTab === tab.id }"
					:aria-selected="activeTab === tab.id"
					@click="activeTab = tab.id"
				>
					{{ tab.title }}
				</button>
			</div>

			<div class="component-preview--actions">
				<span v-if="title" class="component-preview--title">{{ title }}</span>

				<button v-if="activeTab === 'preview'" type="button" class="action" aria-label="Reset example" title="Reset example" @click="resetKey++">
					<i class="fas fa-undo"></i>
				</button>
				<button v-else type="button" class="action" @click="copy">
					<i class="far" :class="copied ? 'fa-check-circle' : 'fa-copy'"></i>
					{{ copied ? 'Copied' : 'Copy' }}
				</button>
			</div>
		</div>

		<div v-show="activeTab === 'preview'" class="component-preview--preview">
			<div v-if="hasSlot('description')" class="description g-typography tag-theme-auto">
				<slot name="description"></slot>
			</div>
			<div v-if="hasSlot('control')" class="component-preview--control">
				<slot name="control"></slot>
			</div>
			<div :key="resetKey" class="component-preview--component">
				<slot></slot>
			</div>
		</div>

		<div v-if="example && activeTab === 'code'" class="component-preview--example">
			<Shiki lang="vue" :code="example" />
		</div>
	</section>
</template>

<script setup>
// Data
	const props = defineProps({
		title: {
			type: String,
		},
		example: {
			type: String,
		},
	});

	const slots = useSlots();

	const activeTab = ref('preview');
	const resetKey = ref(0);
	const copied = ref(false);

	const tabs = computed(() => {
		const result = [{ id: 'preview', title: 'Preview' }];

		if (props.example) result.push({ id: 'code', title: 'Code' });

		return result;
	});

	let copiedTimeout;

// Methods
	const hasSlot = (name) => {
		return !!slots[name];
	}

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(props.example);

			copied.value = true;
			clearTimeout(copiedTimeout);
			copiedTimeout = setTimeout(() => copied.value = false, 2000);
		} catch (err) {
			console.error('component-preview: unable to copy example', err);
		}
	}

// Hooks
	onBeforeUnmount(() => {
		clearTimeout(copiedTimeout);
	});
</script>

<style lang="less">
.component-preview {
	overflow: hidden;
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);

	.component-preview--header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m);
		padding: 0 var(--space-m);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.component-preview--tabs {
		display: flex;
		gap: var(--space-m);

		.tab {
			padding: 12px 4px 10px;
			font-size: var(--text-s);
			font-weight: 500;
			color: var(--color-muted-text);
			border: 0;
			border-bottom: 2px solid transparent;
			background: none;
			cursor: pointer;
			.mix-disable-tap-highlight();

			&:hover {
				color: var(--color-header-text);
			}

			&.tag-active {
				color: var(--color-header-text);
				border-bottom-color: var(--color-primary);
			}
		}
	}

	.component-preview--actions {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		align-self: center;
	}

	.component-preview--title {
		font-size: var(--text-s);
		color: var(--color-muted-text);
	}

	.action {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px;
		font-size: var(--text-s);
		color: var(--color-muted-text);
		border: 0;
		background: none;
		cursor: pointer;
		.mix-disable-tap-highlight();

		&:hover {
			color: var(--color-primary-text);
		}
	}

	.description {
		padding: var(--space-m) var(--space-m) 0;
	}

	.component-preview--control {
		display: grid;
		grid-template-columns: 1fr 1fr; // base columns and their sizes
		grid-auto-flow: column; // tells to add new children as new columns
		grid-auto-columns: 1fr; // tells the size of the dynamic columns
		gap: var(--space-xs);

		padding: var(--space-m) var(--space-m) 0;
	}

	.component-preview--component {
		padding: var(--space-m);
	}

	.component-preview--example {
		overflow: auto;
		background: #24292e; // code highlight theme background

		pre {
			margin: 0;
			padding: var(--space-m);
			font-family: var(--font-mono);
			font-size: var(--text-s);
			line-height: 1.6;
			tab-size: 4;
		}
	}
}
</style>

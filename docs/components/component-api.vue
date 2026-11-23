<template>
	<section v-if="api" class="component-api">
		<template v-for="section of sections" :key="section.title">
			<template v-if="section.rows.length">
				<helper-typography>
					<h3>{{ section.title }}</h3>
				</helper-typography>

				<div class="table-wrap">
					<table>
						<thead>
							<tr>
								<th v-for="column of section.columns" :key="column.key">{{ column.title }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row of section.rows" :key="row.name">
								<td v-for="column of section.columns" :key="column.key" :class="'column-' + column.key">
									<code v-if="column.key === 'name'">{{ row.name }}</code><!--
									--><span v-if="column.key === 'name' && row.required" class="required">*</span>
									<template v-else-if="column.key !== 'name'">{{ row[column.key] || '—' }}</template>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</template>
		</template>
	</section>
</template>

<script setup>
import componentsApi from '~/assets/components-api.generated.json';

// Data
const props = defineProps({
	// Component name from components.json, e.g. "button"
	name: {
		type: String,
		required: true,
	},
});

const api = computed(() => componentsApi[props.name]);

// Description column only when at least one row has a description
const withDescription = (rows, columns) => {
	return rows.some((row) => row.description) ? [...columns, { key: 'description', title: 'Description' }] : columns;
};

const sections = computed(() => {
	if (!api.value) {
		return [];
	}

	const { props: propsList, events, slots } = api.value;

	return [
		{
			title: 'Props',
			rows: propsList,
			columns: withDescription(propsList, [
				{ key: 'name', title: 'Prop' },
				{ key: 'type', title: 'Type' },
				{ key: 'default', title: 'Default' },
			]),
		},
		{
			title: 'Events',
			rows: events,
			columns: withDescription(events, [{ key: 'name', title: 'Event' }]),
		},
		{
			title: 'Slots',
			rows: slots,
			columns: withDescription(slots, [{ key: 'name', title: 'Slot' }]),
		},
	];
});
</script>

<style lang="less">
.component-api {
	margin-top: var(--space-2xl);

	.component-typography + .table-wrap {
		margin-top: var(--space-m);
	}

	.table-wrap + .component-typography {
		margin-top: var(--space-2xl);
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-s);
	}

	th,
	td {
		padding: 12px var(--space-m);
		text-align: left;
		vertical-align: top;
	}

	th {
		font-weight: bold;
		color: var(--color-header-text);
		background: var(--color-surface);
	}

	td {
		color: var(--color-text);
		border-top: 1px solid var(--color-border);
	}

	.column-type,
	.column-default {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		word-break: break-word;
	}

	code {
		padding: 2px 6px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-primary-text);
		border-radius: 4px;
		background: var(--color-surface);
	}

	.required {
		margin-left: 2px;
		color: var(--color-red);
	}
}
</style>

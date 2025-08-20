<template>
	<div>
		<ui-file-input :dictionary="dictionary" v-model="files" multiple />

		<br>

		<helper-typography>
			<ul v-if="files.length">
				<li v-for="item of files">
					{{ item.name }} ({{ item.size }}) bytes
				</li>
			</ul>
			<p v-else>
				No files selected
			</p>
		</helper-typography>
	</div>
</template>

<i18n lang="json">
{
	"en": {
		"select-file": "Attach file(s)",
		"no-files": "No files selected",
		"delete": "Delete",
		"delete-all": "Delete all file(s)",
		"drag-and-drop": "Or drag and drop file to upload."
	},
	"lv": {
		"select-file": "Pievienot failu(-us)",
		"no-files": "Nav atlasīts neviens fails",
		"delete-all": "Dzēst visus failus",
		"delete": "Dzēst",
		"drag-and-drop": "Vai arī velciet un nometiet failu, lai augšupielādētu."
	},
	"ru": {
		"select-file": "Прикрепить файл(ы)",
		"no-files": "Файлы не выбраны",
		"delete-all": "Удалить все файлы",
		"delete": "Удалить",
		"drag-and-drop": "Или перетащите файл для загрузки."
	}
}
</i18n>

<script setup>
	const { t } = useI18n({ useScope: 'local' });

	const files = ref([]);

	const dictionary = computed(() => {
		return {
			'select-file': t('select-file'),
			'no-files': t('no-files'),
			'delete-all': t('delete-all'),
			'delete': t('delete'),
			'drag-and-drop': t('drag-and-drop'),
		};
	});
</script>
<template>
	<div class="component-ui-file-input" :class="classes">

		<!-- Input -->
		<div class="block-input">
			<ui-button class="btn-add" @click="openFileDialogue" color="surface" shape="square">
				<template #prepend>
					<i class="icon-file ic ic-paperclip" aria-hidden="true"></i>
				</template>
				<template #default>
					{{ dictionary['select-file'] }}
				</template>
			</ui-button>

			<div class="status">
				<span class="status-text">{{ filesList.length ? '' : dictionary['no-files'] }}</span>
				<ui-button v-if="filesList.length" @click="filesList = []" class="btn-delete" variant="flat">
					<template #default>
						{{ dictionary['delete-all'] }} ({{ filesList.length }})
					</template>
				</ui-button>
			</div>	
		</div>

		<!-- Filelist -->
		<div class="block-filelist" ref="refDropZone">
			<ul v-if="filesList.length" class="list">
				<li v-for="item of filesList" :key="item.id" class="item">
					<div class="preview" :class="{'tag-image': item.image}">
						<div class="file" @click="item.image ? imagePreview = item.image : ''">
							<img v-if="item.image" :src="item.image" alt="" />
							<span v-else>{{ item.type }}</span>
						</div>
					</div>
					<div class="details">
						<div class="details-inner-wrapper">
							<span class="name">{{ item.file.name }}</span>
							<em class="size">{{ item.size }} KB</em>
						</div>
					</div>
					<span class="delete">
						<ui-button @click="deleteFile(item.id)" variant="flat" shape="round-square">
							{{ dictionary['delete'] }}
						</ui-button>
					</span>
				</li>
			</ul>
			<div class="drag-and-drop" @click="openFileDialogue">
				{{ dictionary['drag-and-drop'] }}
			</div>
		</div>

		<ui-file-input-preview v-model="imagePreview" />
	</div>
</template>

<script setup>
// Imports
	import { ref, watch, computed } from 'vue';
	import { useFileDialog, useDropZone } from '@vueuse/core';
	import UiFileInputPreview from './preview.vue';
	
// Data
	const emit = defineEmits(['update:modelValue']);
	const props = defineProps({
		modelValue: {
			required: true
		},
		dictionary: {
			type: Object,
			default() {
				return {
					"select-file": "Attach file(s)",
					"no-files": "No files selected",
					"delete": "Delete",
					"delete-all": "Delete all file(s) ({n})",
					"drag-and-drop": "Or drag and drop file to upload."
				};
			}
		}
	});

	const filesList = ref([]);
	watch(filesList, e => {
		emit('update:modelValue', e);
	});

	const imagePreview = ref();

	const allowedTypes = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf', 'applicaion/pdf'];

	// Handle button select (file input)
	const { files, open: openFileDialogue, reset, onCancel, onChange: inputOnChange } = useFileDialog({
		//accept: 'image/*', // Set to accept only image files
		accept: allowedTypes, // Set to accept only image files
		multiple: true,
	});
	inputOnChange(e => { filesList.value.push( ...createFileInputFiles(e) ); });

	// Handle drag and drop zone
	const refDropZone = ref();
	const { isOverDropZone } = useDropZone(refDropZone, {
		onDrop(e) {
			filesList.value.push( ...createFileInputFiles(e) );
		},
		// specify the types of data to be received.
		dataTypes: allowedTypes,
		// control multi-file drop
		multiple: true,
		// whether to prevent default behavior for unhandled events
		preventDefaultForUnhandled: false,
	});

	const classes = computed(() => {
		const result = [];

		if (isOverDropZone.value) result.push('tag-drag-over');
		if (!filesList.value.length) result.push('tag-empty');

		return result;
	});

// Methods
	function deleteFile(computedId) {
		for (let i=0; i < filesList.value.length; i++) {
			const item = filesList.value[i];
			if (item.id === computedId) {
				filesList.value.splice(i--, 1);
			}
		}
	}

	function getType(mime) {
		const ar = mime.split('/');

		if (ar.length) {
			if (ar[0] === 'image') 
				return 'image';
			else
				return ar[1];
		}

		return 'file';
	}

	function createFileInputFiles(arFiles) {
		const result = [];

		for (let file of arFiles) {
			const id = `${file.name}-${file.size}`;

			// Skip, if file already exists in list
			if (filesList.value.filter(v => v.id === id).length) continue;

			const o ={
				id,
				file,
				type: getType(file.type),
				size: Math.round(file.size / 1024)
			};

			if (o.type == 'image')
				o.image = URL.createObjectURL(file);

			result.push(o);
		}

		return result;
	}

// Hooks

</script>

<style lang="less">
.component-ui-file-input {
	@com-color-primary-text: var(--ui-color-primary-text);
	@com-color-surface: var(--ui-color-surface);
	@com-color-border-bolder: var(--ui-color-border-bolder);
	@com-color-border: var(--ui-color-border);
	@com-color-header-text:var(--ui-color-header-text);

	@com-border-radius-m: var(--ui-border-radius-default);

	@com-space-default: var(--ui-space-default);
	@com-space-mini: var(--ui-space-mini);
	@com-space-small: var(--ui-space-small);

	@com-text-large: var(--ui-text-large);
	@com-text-default: var(--ui-text-default);
	@com-text-small: var(--ui-text-small);

	@com-font-weight-bold: var(--ui-font-weight-bold);


	.block-input {
		display: grid;
		grid-template-columns: auto 1fr;
		border-radius: @com-border-radius-m;
		border: 1px solid @com-color-border;

		.btn-add {
			border-radius: @com-border-radius-m 0 0 @com-border-radius-m;

			.ic {
				font-size: @com-text-large;
			}
		}

		.btn-delete {
			border-radius: 0 @com-border-radius-m @com-border-radius-m 0;

			.ic {
				padding-left: @com-space-mini;
				font-size: @com-text-default;
			}
		}


		.status {
			display: flex;
			justify-content: end;
			align-items: center;
		}

		.status-text {
			padding-right: @com-space-default;
		}
	}

	.block-filelist {
		position: relative;
		margin-top: @com-space-mini;
		border-radius: @com-border-radius-m;
		border: 1px dashed @com-color-border-bolder;

		.item {
			display: grid;
			grid-template-columns: 80px 1fr 80px;

			.preview {
				padding: @com-space-mini;

				.file {
					overflow: hidden;
					position: relative;
					display: grid;
					place-items: center;
					height: 70px;

					text-transform: uppercase;
					font-size: @com-text-small;
					font-weight: @com-font-weight-bold;
					border-radius: @com-border-radius-m;
					background-color: @com-color-surface;
					border: 1px solid @com-color-surface;
				}

				img {
					object-fit: contain;
				}

				img, span {
					pointer-events: none;
				}

				&.tag-image {
					cursor: pointer;
				}
			}

			.details-inner-wrapper {
				width: 100%;
			}

			.details {
				display: flex;
				justify-content: start;
				align-items: center;
				overflow: hidden;

				.name {
					.mix-text-overflow;

					display: block;
					font-weight: @com-font-weight-bold;
					color: @com-color-header-text;
				}

				.size {
					font-style: italic;
					font-size: @com-text-small;
				}
			}

			.delete {
				display: flex;
				justify-content: end;
				align-items: center;

				.component-ui-button {
					font-size: @com-text-small;
					height: 100%;
				}
			}
		}
	}

	.drag-and-drop {
		position: absolute;
		inset: 0;

		display: none;
		place-items: center;
		padding: @com-space-small;
		text-align: center;
		cursor: pointer;
	}

	// Empty
	&.tag-empty {
		.block-filelist {
			min-height: 150px;
		}

		.drag-and-drop {
			display: grid;
		}
	}

	// Drag over
	&.tag-drag-over {
		.block-filelist {
			border-color: @com-color-primary-text;
			background: @com-color-surface;

			.list {
				opacity: 0.1;
			}
		}

		.drag-and-drop {
			display: grid;
		}
	}
}

@media (max-width: 640px) {
	.component-ui-file-input {
		@com-color-primary-text: var(--ui-color-primary-text);
		@com-color-surface: var(--ui-color-surface);
		@com-color-border-bolder: var(--ui-color-border-bolder);
		@com-color-border: var(--ui-color-border);
		@com-color-header-text:var(--ui-color-header-text);

		@com-border-radius-m: var(--ui-border-radius-default);

		@com-space-mini: var(--ui-space-mini);
		@com-space-small: var(--ui-space-small);

		@com-text-large: var(--ui-text-large);
		@com-text-default: var(--ui-text-default);
		@com-text-small: var(--ui-text-small);

		@com-font-weight-bold: var(--ui-font-weight-bold);

		.block-input {
			grid-template-columns: 1fr;

			.btn-add {
				border-radius: @com-border-radius-m;
			}

			.status {
				display: none;
			}
		}
	}
}

@media (max-width: 520px) {
	.component-ui-file-input {
		@com-color-primary-text: var(--ui-color-primary-text);
		@com-color-surface: var(--ui-color-surface);
		@com-color-border-bolder: var(--ui-color-border-bolder);
		@com-color-border: var(--ui-color-border);
		@com-color-header-text:var(--ui-color-header-text);

		@com-border-radius-m: var(--ui-border-radius-default);

		@com-space-mini: var(--ui-space-mini);
		@com-space-small: var(--ui-space-small);

		@com-text-large: var(--ui-text-large);
		@com-text-default: var(--ui-text-default);
		@com-text-small: var(--ui-text-small);

		@com-font-weight-bold: var(--ui-font-weight-bold);

		.block-input {
			.component-ui-button {
				font-size: @com-text-small;
			}
		}

		.block-filelist {
			.item {
				display: grid;
				grid-template-columns: 70px 1fr 70px;

				.preview {
					
				}

				.details {
					font-size: @com-text-small;
				}
			}
		}

		.drag-and-drop {
			font-size: @com-text-small;
		}
	}
}
</style>
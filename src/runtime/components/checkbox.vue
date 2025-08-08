<template>
	<div class="component-ui component-ui-checkbox" :class="classes">
		<label>
			<input
				ref="input"
				type="checkbox" 

				:id="inputId"
				:name="name"
				:checked="isChecked"
				:disabled="disabled"
				:aria-describedby="describedby"
				@change="updateValue($event.target.checked)"
				autocomplete="off"
			/>

			<i></i>

			<span>
				<slot></slot>
			</span>
		</label>
	</div>
</template>

<script setup>
// Imports
	import { ref, computed } from 'vue';

//
	const props = defineProps({
		name: {
			default: 'cb'
		},
		modelValue: {
			required: true,
		},
		inputId: {
			default: '',
		},
		describedby: {
			default: '',
		},
		error: {
			type: Boolean,
			default: false
		},
		useBinaries: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['change', 'onchange', 'update:modelValue']);

	const classes = computed(() => {
		const ar = [];

		if (props.error) 		ar.push('tag-error');
		if (props.disabled) 	ar.push('tag-disabled');
		if (props.error) 		ar.push('tag-error');

		return ar;
	});

	const isChecked = computed(() => {
		let result = props.modelValue;

		if (props.useBinaries) result = (result === 1 || result === '1') ? true : false;

		return result;
	});

	// Methods
	function updateValue(checked) {
		let value = checked;

		if (props.useBinaries) value = value ? 1 : 0;

		emit('change', value);
		emit('update:modelValue', value);
		emit('onchange', value);
	};
</script>

<style lang="less">
.component-ui-checkbox {
	@com-color-primary: var(--ui-color-primary);
	@com-color-text-on-primary: var(--ui-color-text-on-primary);
	@com-color-border: var(--ui-color-border);
	@com-color-red: var(--ui-color-red);

	@com-color-text: var(--ui-color-text);
	@com-color-header-text: var(--ui-color-header-text);
	@com-color-gray-text: var(--ui-color-gray-text);
	@com-color-error: var(--ui-color-error);

	@com-text-default: var(--ui-text-default);
	@com-text-medium: var(--ui-text-medium);
	@com-text-small: var(--ui-text-small);

	@com-input-height: var(--ui-input-height-default);

	@com-space-micro: var(--ui-space-micro);

	position: relative;
	text-align: left;
	
	> label {
		position: relative;
		display: flex;
		align-items: center;
  		justify-content: left;
		margin: 0;
		padding: 0 0 0 30px;

		height: @com-input-height;
		font-size: @com-text-default;
		font-weight: 500;

		color: @com-color-text;
		cursor: pointer;

		> input {
			position: absolute;
			opacity: 0;
		}

		> i {
			transition: background 0.25s, border-color 0.25s;

			position: absolute;
			top: 50%;
			left: 0;
			margin-top: -9px;
			width: 18px;
			height: 18px;
			border-radius: 3px;
			border: 1px solid @com-color-gray-text;

			color: @com-color-text-on-primary;

			&:before {
				content: '';

				transition: opacity 0.25s;

				opacity: 0;

				position: absolute;
				inset: 0;
				background-position: center;
				background-repeat: no-repeat;
				background-size: 10px;
				background-image: url(./icons/check.white.svg);
			}
		}

		> input:checked + i {
			border-color: @com-color-primary;
			background: @com-color-primary;

			&:before {
				opacity: 1;
			}
		}

		> a {
			position: relative;
		}

		span {
			//font-weight: 600;
			color: @com-color-header-text;
		}
	}

	// Disabled
	&.tag-disabled {
		opacity: 0.6;

		label,
		input {
			cursor: default;
		}
	}

	// Error
	&.tag-error {
		> label i { border-color: @com-color-error; }
		> label > input:checked + i {
			border-color: @com-color-error;
			background: @com-color-error;
		}
	}
}

@media (hover: hover) {
	.component-ui-checkbox {
		// Ally
		@com-outline: var(--ui-outline);
		@com-outline-offset: var(--ui-outline-offset);

		input:focus {
			outline: none;
		}
		input:focus-visible + i {
			outline: @com-outline;
			outline-offset: @com-outline-offset;
		}
	}
}
</style>
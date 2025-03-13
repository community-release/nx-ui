<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-label text="Check checkbox" :required="required" label-for="checkbox-example">
				<ui-checkbox 
					v-model="checked" 
					value="1" 
					name="myCheckbox" 
					input-id="checkbox-example" 
					:required="required"
					:disabled="disabled"
				>
					Checkbox {{checked ? '(checked)' : ''}}
				</ui-checkbox>
			</ui-label>
		</div>
		<ui-label text="Props" fieldset>
			<ui-grid>
				<ui-checkbox v-model="required">Required</ui-checkbox>
				<ui-checkbox v-model="disabled">Disabled</ui-checkbox>
			</ui-grid>
		</ui-label>
	</ui-grid>
</template>

<script setup>
	const checked = ref(0);
	const disabled = ref(false);
	const required = ref(false);
</script>
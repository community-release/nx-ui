<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>

				<!-- Проблема:
				элемент legend должен быть первым элементов в fieldset, и он не может быть обёрнут в 
				обёртку враппер, иначе скрин ридеры его не могут прочесть. 

				Как вариант можно использовать такой вариант:
				<fieldset aria-labelledby="legend-ID">
					<div class="...">
						<legend id="legend-ID">Gender</legend>
					</div>
			
				</fieldset>

				Решение:

				1) Сделать компонент ui-fieldset с параметром legend и слотом, 
				компонент выведит корректную для a11y разметку

				2) Сделать стили для fieldset legend которые будут выглядить как ui-label
				-->

				<!-- <legend>Hello world</legend> -->
			<fieldset>
				<ui-label text="Select one of the radio elements" id="radio-desc" isLegend>
					<ui-grid :gridTemplateColumns="{'default': '1fr 1fr 1fr 1fr', '1000px': '1fr'}">
						<ui-radio v-model="selected" name="radio" value="1" :disabled="disabled" :error="error">Option 1</ui-radio>
						<ui-radio v-model="selected" name="radio" value="2" :disabled="disabled" :error="error">Option 2</ui-radio>
						<ui-radio v-model="selected" name="radio" value="3" :disabled="disabled" :error="error">Option 3</ui-radio>
						<ui-radio v-model="selected" name="radio" value="4" :disabled="disabled" :error="error">Option 4</ui-radio>
					</ui-grid>
				</ui-label>
			</fieldset>
			<div>Selected: {{ selected }}</div>
		</div>
		<ui-grid>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
			<ui-checkbox v-model="error">error</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const selected = ref('1');
const disabled = ref(false);
const error = ref(false);
</script>
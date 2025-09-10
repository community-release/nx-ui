<template>
	<div class="component-ui-typeahead-input" ref="refEl" :class="classes">
		<div class="component-ui-typeahead-input-grid">
			<ui-input 
				ref="refComInput"

				:modelValue="modelValue"
				@update:modelValue="v => emit('update:modelValue', v)" 

				:input-id="inputId"
				:error="error" 
				:name="name" 
				:required="required"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="handleInputTyping"
				@focus="handleInputFocus(true)"
				@blur="handleInputFocus(false)"
				@keydown.down="selectFirstListItem"
				@keydown.esc="handleInputEsc"
				@enter="handleInputFocus(false)"

				v-bind="inputAttrs"
			>
				<template #prepend>
					<ui-button 
						variant="flat" 
						shape="square"
						:color="color" 

						@click.stop="toggleList(true)"
						@keydown.down.prevent="selectFirstListItem"

						aria-hidden="true"
  						tabindex="-1"

						:disabled="disabled"
					>
						<svg class="list-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M1006.444 334.973 553.473 768.982c-15.17 12.8-29.393 18.014-41.481 18.014-12.089 0-28.373-5.26-39.324-15.852L17.563 334.973c-22.746-21.57-23.486-59.733-1.707-80.355 21.63-22.814 57.789-23.556 80.378-1.703l415.758 398.498 415.757-398.217c22.518-21.852 58.737-21.11 80.378 1.704 21.784 20.34 21.073 58.503-1.683 80.073z"/></svg>
					</ui-button>
				</template>
				<template #append>
					<ui-button 
						variant="flat" 
						shape="square"
						:color="color" 

						@click.stop="emit('update:modelValue', '')"

						:aria-label="dictionary['clear']"
						:disabled="disabled"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M1008.882 1008.993c-20.007 20.01-52.377 20.01-72.406 0L511.992 584.366 87.41 1008.993c-20.007 20.01-52.377 20.01-72.406 0-20.007-20.009-20.007-52.382 0-72.414l424.677-424.531L15.069 87.421c-20.007-20.01-20.007-52.383 0-72.414 20.007-20.01 52.377-20.01 72.406 0L511.992 439.73l424.58-424.627c20.007-20.01 52.377-20.01 72.406 0 20.007 20.009 20.007 52.382 0 72.414L584.302 512.048l424.58 424.627c20.157 19.84 20.157 52.479 0 72.318z"/></svg>
					</ui-button>
				</template>
			</ui-input>
			<ui-button shape="default" :disabled="disabled" :color="color">{{ dictionary['submit'] }}</ui-button>
		</div>

		<Teleport to="body">
			<div v-if="listIsShown" class="component-ui-typeahead-input-list" :style="listStyle" @click="handleListClick">
				<!-- ♿ Element for screen reader users, to annotate the number of results found -->
				<div 
					class="component-ui-typeahead-input-list--header"
					:role="a11yAnnotation.length ? 'alert' : ''" 
					:key="a11yAnnotation"
				>
					{{ a11yAnnotation }}
				</div>

				<ul ref="refList" role="listbox">
					<li 
						v-for="(item, index) of filteredList" 
						@click="handleListItemClick(item)"
						role="option"
						tabindex="0"
						@keydown.down.prevent="focusNext(index)"
						@keydown.up.prevent="focusPrev(index)"
						@keydown.enter.prevent="handleListItemClick(item)"
						@keydown.tab="handleListTab($event, index)"
						@keydown.esc="handleListEsc"
					>
						{{ item.name }}
					</li>
				</ul>

				<div class="component-ui-typeahead-input-list--footer">
					<ui-button ref="refListBtnClose" @keydown.tab="handleListButtonTab" @click="listHide" variant="flat" block>{{ dictionary['close'] }}</ui-button>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
// Imports
	import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue';
	import normalizeString from './normalizeString';
	import similarText from './similarText';

// Misc
	const attrs = useAttrs();

// Data
	const emit = defineEmits(['update:modelValue']);

	const props = defineProps({
		modelValue: {
			required: true
		},
		inputId: {
			default: 'typeahead',
		},
		name: {
			default: 'typeahead',
		},
		placeholder: {
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Boolean,
			default: false,
		},
		impulse: {
			default: false
		},
		size: {
			type: String,
			default: 'medium'
		},
		dictionary: {
			type: Object,
			default() {
				return {
					list: 'View list',
					clear: 'Clear input',
					close: 'Close',
					submit: 'Ok',
					itemsFound: `Results found`,
					noItemsFound: `No items found`,
				};
			}
		},

		color: {
			type: String,
			default: 'primary'
		},

		options: {
			type: Array,
			required: true
		}
	});

	const refComInput = ref(null);
	const refEl = ref(null);
	const refList = ref(null);
	const refListBtnClose = ref(null);
	
	let inputBlurTimeout;

	const classes = computed(() => {
		const result = [];

		if (listIsShown.value) result.push('tag-list-active');

		return result;
	});

// List
	const listIsShown = ref(false);
	const listStyle = ref({});
	const optionsPrepared = false;
	const preparedOptions = ref([]);
	const showFullList = ref(false);

	const filteredList = computed(() => {
		let result = [];
		let query = showFullList.value ? '' : props.modelValue;
		let options = preparedOptions.value;

		query = normalizeString(query);

		for (let item of options) {
			// Looking for a query entry
			const position = item.n.indexOf( query );
			
			if (position > -1) {
				result.push({
					likenesses: 100, // Match percentage
					position, // Word position in string
					item
				});
			} else {
				// We compare the query for similarity with each individual word
				for (let j=0, position=0, likenesses; j < item.w.length; j++) {
					likenesses = similarText(item.w[j], query, true);

					// likenesses > {minimum likeness percent}
					if (likenesses > 67) {
						result.push({
							likenesses,
							position,
							item
						});
						break;
					}
					
					position += item.w.length + 1; // 1 = space
				}
			}
			
		}

		// Sort by likenesses (more is better)
		result.sort(function(a, b) { return b.likenesses - a.likenesses; });
		
		// Sort by position (less is better)
		result.sort(function(a, b) { return a.position - b.position; });

		// Format result to match vue-select
		return result.map(v => {
			return v.item;
		});
	});


// 💬 Input data
	const inputAttrs = {};
	for (const key in attrs) {
		if (key.startsWith('input.')) {
			inputAttrs[key] = attrs[key];
		}
	}


// 💬 Input methods
	function selectInput() {
		refComInput.value.refInput.focus();
	}

	/** Handle input typing */
	function handleInputTyping(v) {
		if (v?.length) listShow();
	}

	/** 
	 * Handle input focus
	 * @param {Boolean} haveFocus
	 */
	function handleInputFocus(haveFocus) {
		if (haveFocus) {
			listShow();
		} else {
			clearTimeout(inputBlurTimeout);
			inputBlurTimeout = setTimeout(listHide, 125);
		}
	}

	/**
	 * Handle input escape press
	 * - prevent default action
	 * - hide the list
	 * @param {Event} e
	 */
	function handleInputEsc(e) {
		e.preventDefault();
		listHide();
	}


// 📝 List methods

	/**
	 * Toggle list
	 * @param {Boolean} full - show full list
	 */
	function toggleList(full = false) {
		if (listIsShown.value)
			listHide();
		else
			listShow(full);
	}

	/**
	 * Select first list item
	 * @param {Event} e
	 */
	function selectFirstListItem(e) {
		// If list is active
		if (refList.value) {
			const li = refList.value.querySelector('li');

			// If items exists
			if (li) {
				e.preventDefault();
				li.focus();
				preventListClose();
			}
		}
	}

	/** Focus prev list element, or focus input */
	function focusPrev(index) {
		if (index > 0) {
			const li = refList.value.querySelectorAll('li');

			li[index - 1].focus();
		} else {
			// If on first then return to <input />
			selectInput();
		}
	}

	/** Focus next list element */
	function focusNext(index) {
		const li = refList.value.querySelectorAll('li');

		if (index < li.length - 1) li[index + 1].focus();
	}

	/**
	 * Handle list item click
	 * - update modelValue
	 * - hide the list
	 * - focus <input />
	 */
	function handleListItemClick(item) {
		emit('update:modelValue', `${item.name} (${item.value})`);
		listHide();

		selectInput();
	}

	function handleListClick(e) {
		preventListClose();
	}

	/**
	 * Handle list tab press
	 * Shift + Tab on first -> focus <input />
	 * @param {Event} e
	 * @param {Number} index
	 */
	function handleListTab(e, index) {
		if (e.shiftKey && index === 0) {
			e.preventDefault();
			selectInput();
		}
	}

	/** 
	 * Handle list escape press 
	 * - select input
	 * - hide the list
	 */
	function handleListEsc() {
		selectInput();
		listHide();
	}

	/** 
	 * Show the list
	 * @param {boolean} full - show full list
	 */
	function listShow(full = false) {
		if (listIsShown.value && showFullList.value == full) return;

		preventListClose();

		if (!optionsPrepared) prepareOptions();

		// Position list
		const rect = refEl.value.getBoundingClientRect();

		const top = rect.top + window.scrollY;
		const left = rect.left + window.scrollX;
		const width = rect.width;
		const height = rect.height;

		listStyle.value = {
			top: top + height + 'px',
			left: left + 'px',
			width: width + 'px'
		};

		showFullList.value = full;
		listIsShown.value = true;
	}

	/** Hide the list */
	function listHide() {
		if (listIsShown.value) listIsShown.value = false;
	}

	/** Prevent list close */
	function preventListClose() {
		clearTimeout(inputBlurTimeout);
	}

	/** 
	 * Handle tab click while focus list close button
	 * @param {Event} e
	 */
	function handleListButtonTab(e) {
		if (!e.shiftKey) e.preventDefault();
	}

	/** Prepare list options */
	function prepareOptions() {
		const result = [];

		for (let item of props.options) {
			const n = normalizeString(item.name);
			const o = {
				value: item.value,
				name: item.name,
				n,
				w: n.replace(',', '').split(' ')
			};

			result.push(o);
		}

		preparedOptions.value = result;
	}

// ♿ Annotation for screen reader users, to annotate the number of results found
	const a11yAnnotation = ref('...');
	let tA11y;
	
	watch(filteredList, (v) => {
		clearTimeout(tA11y);
		tA11y = setTimeout(() => {
			a11yAnnotation.value = v.length ? props.dictionary['itemsFound'] +': '+ v.length : props.dictionary['noItemsFound'];
		}, 500);
	});

// 🖱️ Handle click outside
	function handleClickOutside(e) {
		const el1 = e.target.closest('.component-ui-typeahead-input-list');
		const el2 = e.target.closest('.component-ui-typeahead-input');

		if (!el1 && !el2) listHide();
	}
	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
	});
	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<style lang="less">
@import '../styles/components.less';

@com-text-small: var(--ui-text-small);

@com-input-height-default: var(--ui-input-height-default);

@com-color-primary:  var(--ui-color-primary);
@com-color-text-on-primary: var(--ui-color-text-on-primary);
@com-color-surface: @ui-typeahead-input-list-bg;
@com-color-border: var(--ui-color-border);

@com-space-mini: var(--ui-space-mini);
@com-space-micro: var(--ui-space-micro);

@com-border-radius: @ui-typeahead-input-list-border-radius;

.component-ui-typeahead-input {
	.list-icon {
		transition: all var(--ui-ani-time) var(--ui-ani-ease);
	}

	&.tag-list-active {
		.list-icon {
			transform: rotate(180deg);
		}
	}
}

.component-ui-typeahead-input-grid {
	display: flex;
	gap: @com-space-micro;

	> .component-ui-input { flex: 1; }
	> .component-ui-button {
		flex: 0 0 auto;
		padding: 0 @com-space-micro;
	}

	.component-ui-input .component-ui-button {
		padding: 0;
		width: @com-input-height-default;
		height: 100%;
		font-size: @com-text-small;

		.slot-default {
			position: relative;
			display: grid;
			place-items: center;
			height: 100%;
		}

		&:focus-visible {
			outline-offset: -8px;
		}
	}

	input:focus-visible {
		outline: unset;
	}
}

.component-ui-typeahead-input-list {
	z-index: 999;

	position: absolute;
	margin-top: 5px;
	background: @com-color-surface;
	border: 1px solid @com-color-border;
	border-radius: @com-border-radius;

	ul {
		overflow-x: hidden;
		overflow-y: auto;
		max-height: 400px;
	}

	li {
		padding: @com-space-micro @com-space-mini;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			color: @com-color-text-on-primary;
			background: @com-color-primary;
		}
	}

	.component-ui-typeahead-input-list--header {
		text-align: center;
		padding: @com-space-mini;
	}

	.component-ui-typeahead-input-list--footer {
		padding: @com-space-mini;
	}
}
</style>
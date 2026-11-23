<template>
	<nav v-if="items.length" class="component-menu-page-toc">
		<div class="menu-title">On this page</div>
		<ul class="menu-list">
			<li v-for="item of items" :key="item.id" :class="'tag-depth-' + (item.level - minLevel)">
				<a
					:href="'#' + item.id"
					:class="{ 'tag-active': item.id === activeId }"
					@click.prevent="scrollTo(item.id)"
				>
					{{ item.text }}
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
// Data
const props = defineProps({
	// CSS selector of the container to collect headings from
	container: {
		type: String,
		default: '#layout-default .page',
	},
	selector: {
		type: String,
		default: 'h2, h3',
	},
	// Distance from the viewport top where a heading becomes active
	offset: {
		type: Number,
		default: 100,
	},
});

const route = useRoute();

const items = ref([]);
const activeId = ref('');

// Top heading level on the page, nested headings are indented relative to it
const minLevel = computed(() => Math.min(...items.value.map((item) => item.level)));

let mutationObserver = null;
let headings = [];
let collectTimer = null;

// Methods
const slugify = (text) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};

const collect = () => {
	const root = document.querySelector(props.container);

	if (!root) {
		items.value = [];
		headings = [];
		return;
	}

	const used = new Set();

	headings = [...root.querySelectorAll(props.selector)].filter((el) => el.textContent.trim());
	items.value = headings.map((el) => {
		if (!el.id) {
			const base = slugify(el.textContent) || 'section';
			let id = base;
			let index = 2;

			while (used.has(id) || document.getElementById(id)) {
				id = base + '-' + index++;
			}

			el.id = id;
		}

		used.add(el.id);

		return {
			id: el.id,
			text: el.textContent.trim(),
			level: Number(el.tagName.slice(1)),
		};
	});

	updateActive();
};

const scheduleCollect = () => {
	clearTimeout(collectTimer);
	collectTimer = setTimeout(collect, 50);
};

const updateActive = () => {
	let current = '';

	for (const el of headings) {
		if (el.getBoundingClientRect().top - props.offset > 0) {
			break;
		}

		current = el.id;
	}

	// Page scrolled to the bottom: last heading may never reach the offset line
	if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && headings.length) {
		current = headings[headings.length - 1].id;
	}

	activeId.value = current;
};

const scrollTo = (id) => {
	const el = document.getElementById(id);

	if (!el) {
		return;
	}

	const top = el.getBoundingClientRect().top + window.scrollY - props.offset + 20;

	window.scrollTo({ top, behavior: 'smooth' });
	history.replaceState(history.state, '', '#' + id);
};

const observe = () => {
	mutationObserver?.disconnect();

	const root = document.querySelector(props.container);

	if (!root) {
		return;
	}

	// Lazy components and async examples render after mount, so re-collect on DOM changes
	mutationObserver = new MutationObserver(scheduleCollect);
	mutationObserver.observe(root, { childList: true, subtree: true });

	collect();
};

// Hooks
watch(() => route.path, () => {
	nextTick(observe);
});

onMounted(() => {
	observe();
	window.addEventListener('scroll', updateActive, { passive: true });

	if (route.hash) {
		setTimeout(() => scrollTo(decodeURIComponent(route.hash.slice(1))), 300);
	}
});

onBeforeUnmount(() => {
	mutationObserver?.disconnect();
	clearTimeout(collectTimer);
	window.removeEventListener('scroll', updateActive);
});
</script>

<style lang="less">
.component-menu-page-toc {
	.mix-side-menu();

	li.tag-depth-1 a {
		padding-left: calc(var(--space-m) * 2);
	}

	li.tag-depth-2 a {
		padding-left: calc(var(--space-m) * 3);
	}
}
</style>

<template>
	<section class="component-bar-breadcrumbs">
		<ul itemscope itemtype="https://schema.org/BreadcrumbList">
			<li v-for="(item, index) in $breadcrumbs.value" 
				:key="item.name" 
				itemprop="itemListElement" 
				itemtype="https://schema.org/ListItem"
				itemscope
			>
				<span v-if="item.last">{{ $t(item.text) }}</span><!--
				--><nuxt-link-locale v-if="!item.last && item.url !== false" :to="item.url" itemprop="item" :class="{'tag-last': item.last}">
					<span itemprop="name">{{ $t(item.text) }}</span>
				</nuxt-link-locale><meta itemprop="position" :content="index + 1" /><!--
			--></li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'component-bar-breadcrumbs',
}
</script>

<style lang="less">
.component-bar-breadcrumbs {
	position: relative;
	font-size: var(--text-s);
	color: var(--color-text);

	a {
		color: var(--color-muted-text);

		&:hover {
			color: var(--color-primary-text);
		}
	}

	li {
		position: relative;
		display: inline-block;
		margin-right: var(--space-m);
		line-height: 1.7;

		&:after {
			.mix-icon();

			content: '\f054'; // chevron-right
			font-weight: 900;

			position: absolute;
			top: 50%;
			left: 100%;
			width: var(--space-m);
			margin-top: -0.5em;
			font-size: 9px;
			line-height: 1em;
			text-align: center;
			color: var(--color-muted-text);
		}
	}

	li:last-child {
		margin-right: 0;

		&:after {
			display: none;
		}
	}
}
</style>

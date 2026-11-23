import { defineStore } from 'pinia';
import components from '~/assets/components.json';

// useGeneralStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useGeneralStore = defineStore('general', {
    // other options...
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            age: 18,
            name: 'John Vue',
			menuMain: [
				{
					id: 'guide',
					text: 'breadcrumbs.guide',
					m: 1, // mobile
					d: 1 // desktop
				},
				{
					id: 'components',
					text: 'breadcrumbs.components',
					m: 1, // mobile
					d: 1 // desktop
				},
			],
			// Aside menu, also used by search and prev / next page links
			// Item label: "text" is i18n key, "name" is shown as is
			menuAside: [
				{
					text: 'breadcrumbs.guide',
					items: [
						{ text: 'breadcrumbs.introduction', url: '/guide' },
						{ text: 'breadcrumbs.installation', url: '/guide/installation' },
						{ text: 'breadcrumbs.configuration', url: '/guide/configuration' },
					],
				},
				{
					text: 'breadcrumbs.components',
					url: '/components',
					items: components,
				},
			],
        };
    },
	getters: {
		// Flat list of aside menu pages with translated labels
		menuPages(state) {
			const { t } = useI18n();

			return state.menuAside.flatMap((group) => group.items.map((item) => ({
				label: item.text ? t(item.text) : item.name,
				url: item.url,
			})));
		},
		info( state ) {
			const { t } = useI18n();

			return `${state.name}, ${state.age} ${t('age')}`;
		}
	}
});
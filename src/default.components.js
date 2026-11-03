export default function() {
	return {
		accordion: {
			'title-font-size': 'var(--ui-text-l)',
			'text-font-size': 'var(--ui-text-m)',
		},
		button: {
			'border-radius': 'var(--ui-input-size-2xl)',
			'font-weight': 'var(--ui-font-weight-medium)',
		},
		map: {
			'user-position-color': 'var(--ui-color-primary)',
			// CSS filter for map tiles (does not affect markers), e.g. 'grayscale(1)'
			'tiles-filter': 'none',
		},
		select: {
			'value-font-weight': 'var(--ui-font-weight-medium)',
			'background-color': 'var(--ui-color-surface)',
		},
		input: {
			'background-color': 'var(--ui-color-bg)',
		},
		'typeahead-input': {
			'list-bg': 'var(--ui-color-bg)',
			'list-border-radius': 'var(--ui-border-radius-s)',
		},
	};
}
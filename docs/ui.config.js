export default {
	style: {
		// Misc
		'content-width': '1400px',

		// Border radius
		'border-radius-l': '18px',
		'border-radius-m': '9px',
		'border-radius-s': '5px',
		
		// Inputs height
		'input-height-2xl': 'var(--input-height-2xl)',
		'input-height-xl': 'var(--input-height-xl)',
		'input-height-l': 'var(--input-height-l)',
		'input-height-m': 'var(--input-height-m)',
		'input-height-s': 'var(--input-height-s)',
		'input-height-xs': 'var(--input-height-xs)',

		// Line height
		'text-line-height': 1.4,

		// Colors
		'color-header-text': 'var(--color-header-text)',
		'color-text': 'var(--color-text)',
		'color-muted-text': 'var(--color-muted-text)',

		'color-primary': 'var(--color-primary)',
		'color-primary-text': 'var(--color-primary-text)',
		'color-text-on-primary': '#fff',

		'color-secondary': 'var(--color-secondary)',
		'color-secondary-text': 'var(--color-secondary-text)',
		'color-text-on-secondary': 'var(--color-text-on-secondary)',

		'color-gray': 'var(--color-gray)',
		'color-gray-text': 'var(--color-gray-text)',
		'color-text-on-gray': 'var(--color-text-on-gray)',

		'color-red': 'var(--color-red)',
		'color-red-text': 'var(--color-red)',
		'color-text-on-red': '#fff',

		'color-error': 'var(--color-red)',

		'color-surface': 'var(--color-surface)',
		'color-surface-text': '#aaa',
		'color-text-on-surface': 'var(--color-text)',

		'color-bg': 'var(--color-bg)',
		'color-bg-text': '#fff',
		'color-text-on-bg': 'var(--color-text)',

		'color-border': 'var(--color-border)',
		'color-border-bolder': 'var(--color-border-bolder)',

		'color-overlay': 'var(--color-overlay)',

		// Text
		'text-2xl': '32px',
		'text-xl': '24px',
		'text-l': '18px',
		'text-m': '16px',
		'text-s': '14px',
		'text-xs': '12px',

		// Font
		'font-text': 'var(--font-text)',
		'font-header': 'var(--font-header)',
		'font-accent': 'var(--font-text)',
		'font-icons': 'FontAwesome',
		'font-mono': 'var(--font-mono)',

		// Space
		'space-3xl': '100px',
		'space-2xl': '50px',
		'space-xl': '32px',
		'space-l': '25px',
		'space-m': '20px',
		'space-s': '15px',
		'space-xs': '10px',
		'space-2xs': '5px',

		// Box shadow
		'bs-1': 'var(--bs-1)',
		'bs-2': 'var(--bs-2)',
		'bs-3': 'var(--bs-3)',

		// Animation
		'ani-time': '0.3s',
		'ani-ease': 'ease'
	},
	componentsStyle: {
		map: {
			'user-position-color': 'var(--color-primary)'
		},
	},
	componentsProps: {
		button: {
			shape: 'round-square'
		},
		countdown: {
			ms: 15000,
			h: 'Hours',
			m: 'Minutes',
			s: 'Seconds',
		},
	}
};
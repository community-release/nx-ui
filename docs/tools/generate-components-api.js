const fs = require('fs');
const path = require('path');
const { parse } = require('vue-docgen-api');

const componentsDir = path.resolve(__dirname, '../../src/runtime/components/');
const componentsList = require('../assets/components.json');
const outputFile = path.resolve(__dirname, '../assets/components-api.generated.json');

/**
 * Find component source file: "<name>/index.vue" or "<name>.vue"
 * @param {string} name
 */
function resolveComponentFile(name) {
	const candidates = [
		path.join(componentsDir, name, 'index.vue'),
		path.join(componentsDir, name + '.vue'),
	];

	return candidates.find((file) => fs.existsSync(file)) || null;
}

/**
 * Read component props.json with default props values
 * @param {string} file component source file
 */
function readPropsJson(file) {
	const propsFile = path.join(path.dirname(file), 'props.json');

	if (path.basename(file) !== 'index.vue' || !fs.existsSync(propsFile)) {
		return {};
	}

	return JSON.parse(fs.readFileSync(propsFile, 'utf-8'));
}

/**
 * Default value as string, "comProps.<name>" is replaced with value from props.json
 * @param {object} defaultValue docgen default value
 * @param {object} propsJson
 */
function formatDefault(defaultValue, propsJson) {
	if (!defaultValue) {
		return '';
	}

	const value = String(defaultValue.value);
	const match = value.match(/^comProps\.(\w+)$/);

	if (match) {
		return match[1] in propsJson ? JSON.stringify(propsJson[match[1]]).replace(/"/g, '\'') : '';
	}

	return defaultValue.func ? '() => …' : value.replace(/\s+/g, ' ');
}

/**
 * Type name, union types are joined with "|"
 * @param {object} type docgen type
 */
function formatType(type) {
	if (!type) {
		return '';
	}

	return type.name.split('|').map((v) => v.trim()).join(' | ');
}

module.exports = async function generateComponentsApi() {
	const result = {};

	for (const { name } of componentsList) {
		const file = resolveComponentFile(name);

		if (!file) {
			console.warn(`[generate-components-api] component "${name}" source file not found`);
			continue;
		}

		try {
			const doc = await parse(file);
			const propsJson = readPropsJson(file);

			result[name] = {
				description: doc.description || '',
				props: (doc.props || []).map((prop) => ({
					name: prop.name,
					type: formatType(prop.type),
					default: formatDefault(prop.defaultValue, propsJson),
					required: !!prop.required,
					description: prop.description || '',
				})),
				events: (doc.events || []).map((event) => ({
					name: event.name,
					description: event.description || '',
				})),
				slots: (doc.slots || []).map((slot) => ({
					name: slot.name,
					description: slot.description || '',
				})),
			};
		} catch (err) {
			console.warn(`[generate-components-api] unable to parse "${name}": ${err.message}`);
		}
	}

	fs.writeFileSync(outputFile, JSON.stringify(result, null, '\t') + '\n');
};

import defaultComponentsStyle from '../default.components';

export default (options) => {
	let result = '// This file is generated, do not edit. Styles can be edit in default.components.js\n';

	const components = options?.componentsStyle ? options.componentsStyle : {};
	const componentsStyle = defaultComponentsStyle();
	
	for (let name in componentsStyle) {
		const style = Object.assign({}, componentsStyle[name], components[name] ? components[name] : {});

		for (let prop in style) {
			result += `@ui-${name}-${prop}: ${style[prop]};\n`;
		}
	}

	return result;
}
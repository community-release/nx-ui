import defaultComponentsStyle from '../default.components';

export default (options) => {
	let result = '';

	const components = options?.componentsStyle ? options.componentsStyle : {};
	
	for (let name in defaultComponentsStyle) {
		const style = Object.assign(defaultComponentsStyle[name], components[name] ? components[name] : {});

		for (let prop in style) {
			result += `@ui-${name}-${prop}: ${style[prop]};\n`;
		}
	}

	return result;
}
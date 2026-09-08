import defaultStyle from '../default.style';

export default (options) => {
	const style = defaultStyle();
	let result = ':root {';

	const userStyle = options?.style ? options.style : {};
	for (let key in userStyle) {
		style[key] = userStyle[key];
	}

	for (let key in style) {
		result += `--ui-${key}:${style[key]};`;
	}

	result += '}'
	
	return result;
}
/** Normalize string, replace letters with extra symbols, convert to lower case
 * @param {string} s 
 * @returns {string}
 */
export default (s) => {
	if (!s) return '';
	
	const arChars = [
		[['ā', 'à', 'á', 'â', 'ã', 'ä', 'å'], 'a'],
		[['č'], 'c'],
		[['ē'], 'e'],
		[['ģ'], 'g'],
		[['ī'], 'i'],
		[['ķ'], 'k'],
		[['ļ'], 'l'],
		[['ņ'], 'n'],
		[['š'], 's'],
		[['ū'], 'u'],
		[['ž'], 'z'],
		[['!', '\\(', '\\)', '\\[', '\\]', '/'], ''],
	];

	s = s.toLocaleLowerCase();

	for (let item of arChars) {
		for (let letterToReplace of item[0]) {
			s = s.replace( new RegExp(letterToReplace, 'g'), item[1] );
		}
	}
	
	return s.replace(/\s{2,}/g, '').trim();
}
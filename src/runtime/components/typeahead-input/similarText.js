/**
 * Compares two strings for similarity (PHP's similar_text algorithm).
 *
 * The algorithm finds the longest common substring between the two strings
 * and then recursively compares the parts to the left and right of the match.
 *
 * ⚠️ Complexity is O(n³), which may be slow for very long strings, but accurate.
 *
 * @param {string} first - The first string to compare.
 * @param {string} second - The second string to compare.
 * @param {boolean} [percent=false] - If true, returns the similarity as a percentage (0–100).
 *                                    If false or omitted, returns the number of matching characters.
 * @returns {number} The count of matching characters or the similarity percentage.
 *
 * @example
 * // Returns the number of matching characters
 * similarText("hello", "hallo"); // 4
 *
 * @example
 * // Returns the similarity percentage
 * similarText("hello", "hallo", true); // ~80
 */
export default function similarText(first, second, returnPercent = false) {
	if (first == null || second == null) {
		return 0;
	}

	first = String(first);
	second = String(second);

	let pos1 = 0, pos2 = 0, max = 0;
	const firstLength = first.length;
	const secondLength = second.length;

	for (let p = 0; p < firstLength; p++) {
		for (let q = 0; q < secondLength; q++) {
			let l = 0;
			while (
				p + l < firstLength &&
				q + l < secondLength &&
				first.charAt(p + l) === second.charAt(q + l)
			) {
				l++;
			}
			if (l > max) {
				max = l;
				pos1 = p;
				pos2 = q;
			}
		}
	}

	let sum = max;

	if (sum > 0) {
		if (pos1 > 0 && pos2 > 0) {
			sum += similarText(first.slice(0, pos1), second.slice(0, pos2));
		}
		if (pos1 + max < firstLength && pos2 + max < secondLength) {
			sum += similarText(
				first.slice(pos1 + max),
				second.slice(pos2 + max)
			);
		}
	}

	return returnPercent ? (sum * 200) / (firstLength + secondLength) : sum;
}
export default class SearchUtils {
	// Edit distance ref: https://en.wikipedia.org/wiki/Levenshtein_distance
	static editDistance(a, b) {
		if (typeof (a) !== 'string' || typeof (b) !== 'string') {
			throw "search::editDistance - a and b must be strings";
		}
		let memory = new Array();

		function checkMemory(i, j) {
			return memory[i] !== undefined && memory[i][j] !== undefined ? memory[i][j] : undefined;
		}

		function storeInMemory(i, j, value) {
			let row = memory[i];
			if (row === undefined) {
				row = memory[i] = new Array();
			}
			if (row[j] === undefined) {
				row[j] = value;
			}
		}

		function implementation(i, j) {
			if (i === 0) {
				return j;
			}
			if (j === 0) {
				return i;
			}
			let memory = checkMemory(i, j);
			if (memory !== undefined) {
				return memory;
			}
			let d1 = implementation(i - 1, j) + 1;
			storeInMemory(i - 1, j, d1 - 1);

			let d2 = implementation(i, j - 1) + 1;
			storeInMemory(i, j - 1, d2 - 1);

			let d3 = implementation(i - 1, j - 1) + (a[i - 1] === b[j - 1] ? 0 : 1);
			storeInMemory(i - 1, j - 1, d3 - (a[i - 1] === b[j - 1] ? 0 : 1));

			let min = Math.min(d1, d2, d3);
			storeInMemory(i, j, min);
			return min;
		}
		return implementation(a.length, b.length);
	}
}
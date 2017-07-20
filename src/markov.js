var ngrams = {};

var isLetter = function(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

var getCapitalGram = function(txt, order) {
	var capitalChar = 'z';
	var index = 0

	do {
		index = Math.floor(Math.random() * txt.length)

		if (index > txt.length - order) {
			continue;
		}

		capitalChar = txt.charAt(index);
	} while (capitalChar != capitalChar.toUpperCase() || !isLetter(capitalChar));

	return txt.substring(index, index + order);
}

module.exports = {
	setupMarkov: function(txt, order) {
		for (var i = 0; i <= txt.length; i++) {
			var gram = txt.substring(i, i + order);

			if (!ngrams[gram]) {
				ngrams[gram] = [];
			}
			ngrams[gram].push(txt.charAt(i + order));
		}
	},

	markovIt: function(txt, textLength, order) {
		var currentGram = getCapitalGram(txt, order);
		var result = currentGram;

		for (var i = 0; i < textLength - order; i++) {
			var possibilities = ngrams[currentGram];
			if (!possibilities) {
				break;
			}

			var next = possibilities[Math.floor(Math.random() * possibilities.length)];
			result += next;
			var len = result.length;
			currentGram = result.substring(len - order, len);

			if (result.charAt(result.length - 1) == '.') {
				break;
			}
		}

		return result;
	}
}

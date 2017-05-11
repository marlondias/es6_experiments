function showHelp(){
	console.log("Usage: node textFun.js [OPTIONS] TEXT"+
		"\nValid options:"+
		"\n--help    \tShows this information."+
		"\n--reverse \tReverts the given string."+
		"\n--vowels  \tCounts the vowels in the string."+
		"\n--words   \tCounts the words in the string."+
		"\n--palindrome \tChecks if the string is a palindrome."+
		"\n--piglatin \tShows the PigLatin version of the string (it's an english game)."+
		"\nIt is possible to apply multiple options to the same string."+
		"\nUse quotation marks if the target is a phrase."
	);
}

function reverse(txt){
	const original = txt.split("");
	let result = "";
	for(let i = original.length-1; i >= 0; i--){
		result += original[i];
	}
	return result;
}

function piglatin(txt){
	function isVowel(char){
		return (
			char.toLowerCase() === "a" || 
			char.toLowerCase() === "e" || 
			char.toLowerCase() === "i" || 
			char.toLowerCase() === "o" || 
			char.toLowerCase() === "u"
		);
	}

	const original = txt.split("");
	let suffix = "";

	for(char of original){
		if (isVowel(char)) break;
		suffix += char;
	}

	let result = original.slice(suffix.length).join("");

	return (suffix.length === 0) ? (result + "way") : (result + suffix + "ay");
}

function vowelCounter(txt){
	const original = txt.toLowerCase().split("");
	const unicodeA = ["a", "à", "á", "ã", "â"];
	const unicodeE = ["e", "è", "é", "ẽ", "ê"];
	const unicodeI = ["i", "ì", "í", "ĩ", "î"];
	const unicodeO = ["o", "ò", "ó", "õ", "ô"];
	const unicodeU = ["u", "ù", "ú", "ũ", "û"];
	const counter = {a: 0, e: 0, i: 0, o: 0, u: 0};

	for(let char of original){
		if(unicodeA.indexOf(char) !== -1) counter.a++;
		else if(unicodeE.indexOf(char) !== -1) counter.e++;
		else if(unicodeI.indexOf(char) !== -1) counter.i++;
		else if(unicodeO.indexOf(char) !== -1) counter.o++;
		else if(unicodeU.indexOf(char) !== -1) counter.u++;
	}

	return counter;
}

function palindrome(txt){
	if(txt.length === 0) return false;
	else if(txt.length < 2) return true;

	const original = txt.toLowerCase().split("");

	for(let i=0; i < original.length/2; i++){
		if(original[i] !== original[original.length - 1 - i]) return false;
	}
	return true;
}

function wordCounter(txt){
	const validConsonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
	const validVowels = ["a", "à", "á", "ã", "â", "e", "è", "é", "ẽ", "ê", "i", "ì", "í", "ĩ", "î", "o", "ò", "ó", "õ", "ô", "u", "ù", "ú", "ũ", "û"];
	const original = txt.toLowerCase().split("");
	let words = 0, readingWord = false;

	for(char of original){
		if(!readingWord && (validConsonants.indexOf(char) !== -1 || validVowels.indexOf(char) !== -1)){
			//Encontrou uma palavra e deve mudar de estado
			words++;
			readingWord = !readingWord;
		}
		else if(readingWord && (validConsonants.indexOf(char) === -1 && validVowels.indexOf(char) === -1)){
			//Encontrou um separador e deve mudar de estado
			readingWord = !readingWord;
		}
	}

	return words;
}

function main(){
	const relevantArgs = process.argv.slice(2);

	if (relevantArgs.length > 1){
		const targetString = relevantArgs.pop(); // Last argument is ALWAYS the string
		const options = new Set();

		for(arg of relevantArgs){
			if (arg.toLowerCase() === "--help") options.add("help");
			if (arg.toLowerCase() === "--reverse") options.add("reverse");
			if (arg.toLowerCase() === "--piglatin") options.add("piglatin");
			if (arg.toLowerCase() === "--vowels") options.add("vowels");
			if (arg.toLowerCase() === "--palindrome") options.add("palindrome");
			if (arg.toLowerCase() === "--words") options.add("words");
		}

		if(options.size === 0){
			console.log(`No valid arguments found! The string is: ${targetString}`);
		}
		else if(options.has("help")) showHelp();
		else{
			console.log("Original: " + targetString);
			if (options.has("reverse")) console.log("Reverse: " + reverse(targetString));
			if (options.has("piglatin")) console.log("Pig Latin: " + piglatin(targetString));
			if (options.has("vowels")){
				const vows = vowelCounter(targetString);
				console.log(`Vowels: A = ${vows.a}, E = ${vows.e}, I = ${vows.i}, O = ${vows.o}, U = ${vows.u}`);
			}
			if(options.has("palindrome")){
				if(palindrome(targetString)) console.log("Palindrome: Yes");
				else console.log("Palindrome: No");
			}
			if (options.has("words")) console.log("Words: " + wordCounter(targetString));
		}
	}
	else {
		console.error("Insuficient arguments!");
		showHelp();
	}
}

main();
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
	const original = txt.split("");
	const unicodeA = ["a", "à", "á", "ã", "â"];
	const unicodeE = ["e", "è", "é", "ẽ", "ê"];
	const unicodeI = ["i", "ì", "í", "ĩ", "î"];
	const unicodeO = ["o", "ò", "ó", "õ", "ô"];
	const unicodeU = ["u", "ù", "ú", "ũ", "û"];
	const counter = {a: 0, e: 0, i: 0, o: 0, u: 0};

	for(let char of original){
		char = char.toLowerCase();
		if(unicodeA.indexOf(char) !== -1) counter.a++;
		else if(unicodeE.indexOf(char) !== -1) counter.e++;
		else if(unicodeI.indexOf(char) !== -1) counter.i++;
		else if(unicodeO.indexOf(char) !== -1) counter.o++;
		else if(unicodeU.indexOf(char) !== -1) counter.u++;
	}

	return counter;
}

function main(){
	const relevantArgs = process.argv.slice(2);

	if (relevantArgs.length > 1){
		const targetString = relevantArgs.pop(); // Last argument is ALWAYS the string
		const options = new Set();

		for(arg of relevantArgs){
			if (arg.toLowerCase() === "--reverse") options.add("reverse");
			if (arg.toLowerCase() === "--piglatin") options.add("piglatin");
			if (arg.toLowerCase() === "--vowels") options.add("vowels");
		}

		if(options.size === 0){
			console.log(`No valid arguments found! The string is: ${targetString}`);
		}
		else{
			console.log("Original: " + targetString);

			if (options.has("reverse")) console.log("Reverse: " + reverse(targetString));
			if (options.has("piglatin")) console.log("Pig Latin: " + piglatin(targetString));
			if (options.has("vowels")){
				const vows = vowelCounter(targetString);
				console.log(`Vogais: A = ${vows.a}, E = ${vows.e}, I = ${vows.i}, O = ${vows.o}, U = ${vows.u}`);
			}
		}

	}
	else console.error("Insuficient arguments! \nUsage: node textFun.js [OPTIONS] TEXT");
}

main();
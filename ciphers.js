function showHelp(){
	console.log("Usage: node ciphers.js [OPTIONS] TEXT"+
		"\nValid options:"+
		"\n--help    \tShows this information."+
		"\n--ceasarEncode=XX \tEncodes the given string using Ceasar's Cipher."+
		"\n--ceasarDecode=XX \tDecodes the given string using Ceasar's Cipher."+
		"\n(work in progress)"
	);
}

function ceasar(txt, offset){
	if(offset === 0) return txt;

	const unicodeA = ["a", "à", "á", "ã", "â"];
	const unicodeE = ["e", "è", "é", "ẽ", "ê"];
	const unicodeI = ["i", "ì", "í", "ĩ", "î"];
	const unicodeO = ["o", "ò", "ó", "õ", "ô"];
	const unicodeU = ["u", "ù", "ú", "ũ", "û"];
	const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	const original = txt.toLowerCase().split("");
	const result = "";

	for(let char of original){
		if(unicodeA.indexOf(char) === -1) char = "a";
		else if(unicodeE.indexOf(char) === -1) char = "e";
		else if(unicodeI.indexOf(char) === -1) char = "i";
		else if(unicodeO.indexOf(char) === -1) char = "o";
		else if(unicodeU.indexOf(char) === -1) char = "u";

		let position = alphabet.indexOf(char);
		if (position === -1) result += "?";
		else{
			position -= offset;
			result += (position >= 0) ? alphabet[position] : alphabet[alphabet.length-position];
		}
	}

	return result;
}

function main(){
	const relevantArgs = process.argv.slice(2);

	if (relevantArgs.length > 1){
		const targetString = relevantArgs.pop(); // Last argument is ALWAYS the string
		const options = new Set();

		if(options.size === 0){
			console.log(`No valid arguments found! The string is: ${targetString}`);
		}
		else{
			console.log("Original: " + targetString);
		}
	}
	else{
		console.error("Insuficient arguments!");
		showHelp();
	}
}

main();
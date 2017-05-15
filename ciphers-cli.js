//TBD: Vigenere's cipher

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
	if(offset >= 26 || offset <= -26) offset = offset % 26; //Maybe adapt for different alphabets

	const unicodeA = ["a", "à", "á", "ã", "â"];
	const unicodeE = ["e", "è", "é", "ẽ", "ê"];
	const unicodeI = ["i", "ì", "í", "ĩ", "î"];
	const unicodeO = ["o", "ò", "ó", "õ", "ô"];
	const unicodeU = ["u", "ù", "ú", "ũ", "û"];
	const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	const original = txt.toLowerCase().split("");
	let result = "";

	for(let char of original){
		if(unicodeA.indexOf(char) !== -1) char = "a";
		else if(unicodeE.indexOf(char) !== -1) char = "e";
		else if(unicodeI.indexOf(char) !== -1) char = "i";
		else if(unicodeO.indexOf(char) !== -1) char = "o";
		else if(unicodeU.indexOf(char) !== -1) char = "u";

		let pos = alphabet.indexOf(char);
		if (pos === -1) result += char;
		else{
			pos -= offset;
			result += (pos < 0) ? alphabet[alphabet.length + pos] : alphabet[pos];
		}
	}

	return result;
}

function main(){
	const relevantArgs = process.argv.slice(2);

	if (relevantArgs.length > 1){
		const targetString = relevantArgs.pop(); // Last argument is ALWAYS the string
		const options = new Map();

		for(let arg of relevantArgs){
			arg = arg.toLowerCase().split("=");
			if(arg.length === 2){
				if(arg[0] === "--ceasarencode"){
					const value = arg[1] * 1;
					if(!isNaN(value)) options.set("ceasarEnc", value);
				}
				else if(arg[0] === "--ceasardecode"){
					const value = arg[1] * -1;
					if(!isNaN(value)) options.set("ceasarDec", value);
				}
			}
		}

		if(options.size === 0){
			console.log(`No valid arguments found! The string is: ${targetString}`);
		}
		else{
			console.log("Original: " + targetString);

			if(options.has("ceasarEnc")){
				const offset = options.get("ceasarEnc");
				console.log(`Ceasar's Cipher encoded by ${offset} is: ` + ceasar(targetString, offset));
			}
			if(options.has("ceasarDec")){
				const offset = options.get("ceasarDec");
				console.log(`Ceasar's Cipher decoded by ${offset} is: ` + ceasar(targetString, offset));
			}
		}
	}
	else{
		console.error("Insuficient arguments!");
		showHelp();
	}
}

main();

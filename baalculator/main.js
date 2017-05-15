const clearScreen = function(){
	document.getElementById("calculator").getElementsByClassName("screen")[0].innerHTML = '0';
};

const getScreen = function(){
	return '' + document.getElementById("calculator").getElementsByClassName("screen")[0].innerHTML;
};

const setScreen = function(value){
	const scr = document.getElementById("calculator").getElementsByClassName("screen")[0];
	if(value.length > 18) scr.innerHTML = '&#129304;';
	else {
		scr.innerHTML = '' + value;
		satanify(value);
	}
};

const numberClicked = function(value){
	const current = getScreen();
	if(current.codePointAt(0) === 129304) return;

	if(current === "0"){
		setScreen(value);
	}
	else{
		setScreen(current + value);
	}
};

const operatorClicked = function(oper){
	const current = getScreen();
	if(current.codePointAt(0) === 129304) return;

	function lastIsOperator(){
		return (
			current.lastIndexOf("+") === current.length-1 || 
			current.lastIndexOf("-") === current.length-1 || 
			current.lastIndexOf("x") === current.length-1 || 
			current.lastIndexOf("/") === current.length-1 || 
			current.lastIndexOf(".") === current.length-1
		);
	}

	if(oper === "plus"){
		if(lastIsOperator()) setScreen(current.slice(0,-1) + "+");
		else setScreen(current + "+");
	}
	else if(oper === "minus"){
		if(lastIsOperator()) setScreen(current.slice(0,-1) + "-");
		else setScreen(current + "-");
	}
	else if(oper === "multiply"){
		if(lastIsOperator()) setScreen(current.slice(0,-1) + "x");
		else setScreen(current + "x");
	}
	else if(oper === "divide"){
		if(lastIsOperator()) setScreen(current.slice(0,-1) + "/");
		else setScreen(current + "/");
	}
	else if(oper === "signal"){
		if(!isNaN(current))	setScreen(-1 * current);
	}
	else if(oper === "dot"){
		if(isNaN(current)){
			//procurar ultimo operador
			let lastOP = -1;
			lastOP = (current.lastIndexOf("+") > lastOP) ? current.lastIndexOf("+") : lastOP;
			lastOP = (current.lastIndexOf("-") > lastOP) ? current.lastIndexOf("-") : lastOP;
			lastOP = (current.lastIndexOf("/") > lastOP) ? current.lastIndexOf("/") : lastOP;
			lastOP = (current.lastIndexOf("x") > lastOP) ? current.lastIndexOf("x") : lastOP;
			//separa o número após este operador, e verifica se ja possui "."
			lastNum = current.slice(lastOP+1);
			if(lastNum.length > 0 && lastNum.lastIndexOf(".") === -1) setScreen(current + ".");
		}
		else{
			if(current.lastIndexOf(".") === -1) setScreen(current + ".");
		}
	}
};

const specialClicked = (function(){
	const operations = [];

	return function(func){
		if(func === "ce") setScreen("0");
		else if(func === "undo"){
			if(operations.length > 0) setScreen(operations.pop().exp);
			else setScreen("0");
		}
		else if(func === "clear"){
			operations.splice(0, operations.length);
			setScreen("0");
		}
		else if(func === "result"){
			let expr = getScreen();
			if(expr.codePointAt(0) === 129304) return; //é overflow

			//retira qualquer operador solto
			if( expr.lastIndexOf("+") === expr.length-1 || 
				expr.lastIndexOf("-") === expr.length-1 || 
				expr.lastIndexOf("x") === expr.length-1 || 
				expr.lastIndexOf("/") === expr.length-1 || 
				expr.lastIndexOf(".") === expr.length-1){
				expr = expr.slice(0, -1);
			}

			if(!isNaN(expr)) return; //já é valor numérico

			let result = eval(expr.replace(/x/g, "*")); //avalia a expressão
			operations.push({exp: expr, res: result}); //registra na linha do tempo
			setScreen(result);
		}
	};
})();

function satanify(value){
	const bapho = document.getElementById("bapho");
	let level = 0;

	if(!isFinite(value) || value == 0) level = 0;
	else if(value == 666 || value == 13 || value == 11) level = 1;
	else{
		if(value % 6 === 0) level += 0.2;
		if(value % 9 === 0) level += 0.1;
		if(value % 11 === 0) level += 0.1;
		if(value % 13 === 0) level += 0.2;
		if(value % 33 === 0) level += 0.1;
		if(value % 666 === 0) level += 0.3;
	}

	bapho.style.opacity = level + "%";
	bapho.style.left = (150 - level * 150) + '%';
}

(function(){
	function hasClass(elem, cls) {
	    return (' ' + elem.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	//Prepara os botões
	const keys = document.getElementById("calculator").getElementsByClassName("key");
	for(key of keys){
		if(hasClass(key, "operator")){
			key.addEventListener('click', function(){
				const oper = this.getAttribute("data-operation");
				operatorClicked(oper);
			});
		}

		if(hasClass(key, "number")){
			key.addEventListener('click', function(){
				const value = this.getAttribute("data-number");
				numberClicked(value);
			});
		}

		if(hasClass(key, "special")){
			key.addEventListener('click', function(){
				const func = this.getAttribute("data-operation");
				specialClicked(func);
			});
		}
	}

	setScreen("0");
})();

const funk = require('funkjs');

function song(){
	for(let day in Week.days){
		if(day >= Week.monday && day <= Week.friday){
			console.log('Esporro na escola.');
			continue;
		}
		releaseThePipa();
		playTheBall();
	}

	const potranca = new Potranca();
	potranca.dance();
	potranca.dance('emoção');
	const eu = { name: 'Jonathan', generation: new Generation() };

	eu.grow();
	eu.fill('emotions');
	eu.get('filé', 'popozão');
}
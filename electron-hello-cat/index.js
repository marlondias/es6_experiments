const picture = require('cat-picture');
const image = require('lightning-image-poly');
const remote = require('electron').remote;
const fs = require('fs');

function savePDF(){
	remote.getCurrentWindow().webContents.printToPDF({portrait: true}, (err, data) => {
		if(err){
			console.error('Error on printToPDF! Message: ' + err.message);
		}
		fs.writeFile('annotation.pdf', data, (err) => {
			if(err){
				console.error('Error saving PDF! Message: ' + err.message);
			}
			else{
				alert('PDF was saved!');
			}
		});
	});
}

window.addEventListener('keydown', (e) => {
	if(e.keyCode == 80) savePDF(); // P
});

const source = picture.src;
picture.remove();
const viz = new image('#visualization', null, [source], {hullAlgorithm: 'convex'});


const fs = require('fs');
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const app = express();

app.get('/scrape', function(req, res){
	console.log('Started!');

	//Filme Anchorman 2
	const url = 'http://www.imdb.com/title/tt1229340/';
	const json = { title: '', release: '', rating: '' };

	//Chamar o request com URL e um error-first-callback
	request(url, function(error, response, html){
		if(error){
			console.log('Um erro ocorreu!');
			return;
		}

		const $ = cheerio.load(html); //jQuerify the document
		let title, release, rating;

		rating = $('.title_bar_wrapper .ratings_wrapper .imdbRating strong span').text();

		const tit_elem = $('.title_bar_wrapper .titleBar .title_wrapper');

		release = tit_elem.children('h1').children('#titleYear').children('a').text();

		tit_elem.children('.originalTitle').children().remove();
		title = tit_elem.children('.originalTitle').text();

		json.title = title;
		json.rating = rating;
		json.release = release;

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			if(err){
				console.log('There was an error while saving the JSON file!');
				return;
			}
			console.log('JSON file was successfully written to the project directory!');
		});
		
	});

	res.send('Check your console!');
});

app.listen('8081');
console.log('Magic happens on port 8081/scrape!');
exports = module.exports = app;
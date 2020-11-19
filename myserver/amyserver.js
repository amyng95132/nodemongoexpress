const http = require('http');
const fs = require('fs');
const _ = require('lodsh');

const server = http.createServer((req, res) => {
	//console.log('request made');
	//request from the browser
	console.log(req.url, req.method);

	//lodsh
	//https://www.youtube.com/watch?v=bdHE2wHT-gQ
	const myRandom = _.random(0, 10);
	//response to the browser
	//set header content type
	// res.setHeader('Content-Type', 'text/plain');
	// res.write('hello, amy');

	res.setHeader('Content-Type', 'text/html');
	// res.write('<p>hello, amy</p>');
	// res.write('<p>hello again, amy</p>');
	// res.end();

	//external html file
	// fs.readFile('./views/testcssinjectiondom.html', (err, data) => {
	// 	if(err){
	// 		console.log(err);
	// 		res.end();
	// 	}else{
	// 		res.write(data);
	// 		res.end();
	// 	}
	// })

	//several html pages - routing
	let path = './views/';
	switch(req.url){
		case '/':
			path += 'index.html';
			break;
		case '/next.us':
			res.statusCode = 301; //redirect
			res.setHeader('Location', '/next');
			break;
		case '/next':
			path += 'next.html';
			break;
		default:
			path += '404.html';
			break;
	}

fs.readFile(path, (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}else{
			res.write(data);
			res.end();
		}
	})

});
//http://10.0.0.57/
// server.listen(3000, 'localhost', () => {
	server.listen(3000, '10.0.0.57', () => {
	console.log('listening for request on port 3000');
});
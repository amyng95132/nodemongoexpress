const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//express app
const app = express();

//connect to mongode
const dburl ='mongodb+srv://ninja:amy12345@nodejscluster.jbc2s.mongodb.net/NodeJsCluster?retryWrites=true&w=majority';

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');

//listening for requests on port 3000
// app.listen(3000);

//middlewave
// app.use((req, res, next) => {
// 	console.log('new request made:');
// 	console.log('host', req.hostname);
// 	console.log('path', req.path);
// 	console.log('method', req.method);
// 	next();
// });

//3rd party morgan middlewave
app.use(morgan('dev'));

//static files eg: css 
//create a public folder and all files are 
//accessible
app.use(express.static('public'));

//mongoose and mongo routes
app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'new title blog 2',
		snippet: 'my snippet blog',
		body: 'this is the body'
	});

	blog.save()
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err)
		});
})

app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/single-blog', (req, res) => {
	Blog.findById('5fb56811ab6f091a4cb98d19')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});
//response
app.get('/', (req, res) =>{
	const blogs = [
	{title: 'title1', snippet: 'note1'},
	{title: 'title2', snippet: 'note2'},
	];
	res.render('index', {title: 'Home', blogs});

	//res.send('<p>test</p>');
	//by default, sendFile() looks for an 
	//absolution path
	//but here we have relative path
	//res.sendFile('./views/index.html', { root:__dirname });
});

app.get('/about', (req, res) =>{
	//res.sendFile('./views/next.html', { root:__dirname });
	//ejs view engine
	res.render('about');
});
app.get('/blogs/create', (req, res) =>{
	res.render('create', {title: 'About'});
});

//redirect
app.get('/about.us', (req, res) =>{
	res.redirect('/about');
});

//404 error, use() is to fire up functins in the middleware
app.use((req, res) => {
	res.status(404).render('404');
//res.status(404).sendFile('./views/404.html', { root:__dirname });
});
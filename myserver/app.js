//https://www.youtube.com/watch?v=VVGgacjzc2Y&t=1370s
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


//static files eg: css 
//create a public folder and all files are 
//accessible
app.use(express.static('public'));

//3rd party morgan middlewave
app.use(morgan('dev'));

//for POST get title etc from create.ejs
//parse the data from create.ejs to here
app.use(express.urlencoded({ extended: true })); 

//response
app.get('/', (req, res) =>{
	res.redirect('/blogs');
	// const blogs = [
	// {title: 'title1', snippet: 'note1'},
	// {title: 'title2', snippet: 'note2'},
	// ];
	// res.render('index', {title: 'Home', blogs});

	//res.send('<p>test</p>');
	//by default, sendFile() looks for an 
	//absolution path
	//but here we have relative path
	//res.sendFile('./views/index.html', { root:__dirname });
});

app.get('/about', (req, res) =>{
	//res.sendFile('./views/next.html', { root:__dirname });
	//ejs view engine
	res.render('about', {title: 'About'});
	
});
app.get('/blogs', (req, res) => {
	//sort -1 the newest
	Blog.find().sort({ createdAt: -1})
		.then((result) => {
			res.render('index', {title: 'All Blogs', blogs: result })
		})
		.catch((err) => {
			console.log(err);
		})
})

app.post('/blogs', (req, res) => {
	//console.log(req.body);
	const blog = new Blog(req.body);
	blog.save()
	.then((result) =>{
		res.redirect('/blogs');
	})
	.catch((err) => {
		console.log(err);
	})
});

app.get('/blogs/create', (req, res) =>{
	res.render('create', { title: 'Create a new Blog' });
});

app.get('/blogs/:id', (req, res) => {
//	app.get('/blogs/id', (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id);
	//console.log(id); //will return id in cosole, but hang in browser
	Blog.findById(id)
		.then(result => {
			res.render('details', {blog: result, title: 'Blog Details'});
		})
		.catch((err) => {
			console.log(err);
		})
})

app.delete('/blogs/:id', (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id);
	Blog.findByIdAndDelete(id)
	.then(result => {
		//fetch in details.ejs is ajax must use json()
		//cannot use redirect directly.
		res.json({ redirect: '/blogs' });
	})
	.catch(err => {
		console.log(err);
	})
})

//redirect
app.get('/about.us', (req, res) =>{
	res.redirect('/about');
});



//404 error, use() is to fire up functins in the middleware
app.use((req, res) => {
	res.status(404).render('404');
//res.status(404).sendFile('./views/404.html', { root:__dirname });
});
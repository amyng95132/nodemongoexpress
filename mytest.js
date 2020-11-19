const fs = require('fs');

//read file
// fs.readFile('./MyTags.txt', (err, data) => {
// 	if(err){
// 		console.log(err);
// 	}

// 	console.log(data.toString());
// });

//writing files

//directories
// if(!fs.existsSync('./assets')){
// fs.mkdir('./assets', (err) =>{
// 	if(err){
// 		console.log(err);
// 	}
// 		console.log('folder created');
// 	});
// 	}else{
// 		fs.rmdir('./assets', (err) =>{
// 		console.log('folder deleted');
// 	})
// }

//deleting files
if(fs.existsSync('./MyTags.txt')){
	fs.unlink('./MyTags.txt', (err) =>{
		if(err){
			console.log(err);
		}
		console.log('File deleted');
	})
}

// setTimeout(() => {
// 	alert("what");
// }, 1000);

// console.log(__dirname);
// console.log(__filename);
// greet("Amy");
// greet("Garlic");

// const a = require('./myjavascript');
// console.log(a.people, a.ages);

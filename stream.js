const fs = require('fs');

const readStream = fs.createReadStream('./blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./blog4.txt');


//onlick listener 'data'
// readStream.on('data', (chunk) => {
//    	console.log('=== new chunk ===');
// 	console.log(chunk);
// 	writeStream.write('\nNew Chunk\n');
// 	writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream);
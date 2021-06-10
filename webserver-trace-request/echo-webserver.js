var http = require('http');
var fs = require('fs');
var path = require('path');
var util = require('util');
var os = require("os");

var cback = function (err) {
    if (err) return console.log(err);
};

http.createServer(function (request, response) {

  var filename = "log.txt";
  console.log(request.url);
  fs.writeFile(filename, request.url + os.EOL, { flag: 'a+' }, cback);
  
  console.log(request.method);
  fs.writeFile(filename, request.method + os.EOL, { flag: 'a+' }, cback);
  
  console.log(JSON.stringify(request.headers));
  fs.writeFile(filename, JSON.stringify(request.headers) + os.EOL, { flag: 'a+' }, cback);

  const chunks = [];
  request.on('data', chunk => chunks.push(chunk));
  request.on('end', () => {
    const data = Buffer.concat(chunks);
    console.log('Data: ', data.toString());
    fs.writeFile(filename, data.toString() + os.EOL, { flag: 'a+' }, cback);
    fs.writeFile(filename, '==============================' + os.EOL, { flag: 'a+' }, cback);
  })

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end('{"success":true}', 'utf-8');

}).listen(9002);

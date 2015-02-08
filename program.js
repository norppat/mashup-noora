var http = require('http');
var _ = require('lodash');

var jsonUtils = require('./jsonUtils');
var dbUtils = require('./dbUtils');

var url = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

// Get data
var books = jsonUtils.getJsonBooks(url);

// Save books to db
dbUtils.saveBooks(books);

http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Books</title>");
  response.write("</head>");
  response.write("<body><h1>Books</h1>");
  
  _.forEach(books, function(book) {
	  response.write("<h2>" + book.displayName + "</h2>");
	  response.write(book.year);
  });
  response.write("</body>");
  response.write("</html>");
  response.end();
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');










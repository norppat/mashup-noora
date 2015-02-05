// Hae aluksi Chromella Helsingin yliopiston dataa täältä: http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell 

var http = require('http');
var _ = require('lodash');

var url = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';
var books = [];


http.get(url, function(res) {

    var body = "";

    res.on("data", function(chunk) {
        body += chunk;
    });

    res.on("end", function() {

        var authorRes = JSON.parse(body);
        for (var i = 0; i < authorRes.records.length; i++) {
        	var title = authorRes.records[i].title;
        	var year = authorRes.records[i].year;
        	//console.log(title, ", ", year);
			books.push({displayName: title, year: year});
        };
		console.log("Retrieved " + books.length + " books");
    });

}).on("error", function(e) {
      console.log("Error: ", e);
});

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










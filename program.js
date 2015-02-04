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

        	console.log(title, ", ", year);
			
			books.push({displayName: title, year: year});
        };
		
		

    });

}).on("error", function(e) {
      console.log("Error: ", e);
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  res.end('Hello World\n' + books);
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');










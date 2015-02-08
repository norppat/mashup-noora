
var http = require('http');
var _ = require('lodash');

module.exports = {
  getJsonBooks: function(url) {
    http.get(url, function(res) {
			var books = [];

			var body = "";

			res.on("data", function(chunk) {
				body += chunk;
			});

			res.on("end", function() {

				var authorRes = JSON.parse(body);
				for (var i = 0; i < authorRes.records.length; i++) {
					var title = authorRes.records[i].title;
					var year = authorRes.records[i].year;
					var library_id = authorRes.records[i].library_id;
					console.log(title, ", ", year + ", " + library_id);
					books.push({id: library_id, displayName: title, year: year});
				};
				console.log("Retrieved " + books.length + " books");
			});
			return books;

		}).on("error", function(e) {
			  console.log("Error: ", e);
		});
  }

};

var http = require('http');
var _ = require('lodash');

var mongoString = "mongodb://localhost:27017/mashupDb";

module.exports = {
  saveBooks: function(bookData) {
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect(mongoString, function(err, db) {
		if (err) { return console.dir(err); }

		var collection = db.createCollection('books', function(err, collection) { console.log(err);});
		console.log("Collection created");
		// Ei toimi, ReferenceError books not defined
		collection.insert(books, {w:1}, function(err, result) { console.log(err);});
		
		db.close();
	});
  },
  
  getBooks: function() {
	 // Tätä ei ole edes testattu, yhteyshommat kannattaisi siirtää omaksi funktioksi
	 // Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect(mongoString, function(err, db) {
		if (err) { return console.dir(err); }

		var collection = db.collection('books');
		collection.find().toArray(function(err, books) {});
		
		db.close();
	});
  }
};


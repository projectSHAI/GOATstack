"use strict";

var express = require("express");
var path = require("path");
var MongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV

var app = express();

app.use(express.static('client'));
app.use(express.static('node_modules'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

if(environment === 'development') {
  MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
    if (err) {
      throw err;
    }
    db.collection('mammals').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      console.log(environment);
    });
  });
}

var MongoClient = require('mongodb').MongoClient;

exports.damn = MongoClient.connect('mongodb://localhost:27017/dreams', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('dreams').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  assert.equal(null, err);

  console.log("database is connected");
  const db = client.db('adwa');

  //const collection = client.db("adwa").collection("graphql");

  // perform actions on the collection object
  //client.close();
  insertDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // get the documents collection
  const collection = db.collection('graphql');

  // insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
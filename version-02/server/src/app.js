const express = require('express')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net?retryWrites=true&w=majority";
mongoose.connect(uri, {dbName: 'graphql-tutorial'});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("now listening for requests on 4000")

  const q = ` 
{
  book(id: "1") {
    name
    genre
    id
  }
}
{
  book(id: "2") {
    name
    genre
    id
    author {
      name
    }
  }
}
{
  author(id: 1) {
    name
    age
  }
}
mutation {
	addBook(name: "The Light Fantastic", genre: "Fantasy", authorId: "5cf21a2332a4c23755e09d24") {
    name
    genre    
  },  
}`;
  console.log('use the query:', q);

})
const express = require('express')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

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
}`;
  console.log('use the query:', q);

})
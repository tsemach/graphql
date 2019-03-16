const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const books = [ 
  {name: 'Name of the wind', genre: 'Fantasy', id: '1'},
  {name: 'The final Empire', genre: 'Fantasy', id: '2'},
  {name: 'The long earth', genre: 'Sci-Fi', id: '3'}
]

const BootType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BootType,
      args: { id: {type: GraphQLString} },
      resolve(parent, args) {
        // code to get data from database
        return _.find(books, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
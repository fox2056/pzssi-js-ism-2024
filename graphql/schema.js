const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql")
const bookResolvers = require("./bookResolvers")

// Project Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: bookResolvers.Query.books,
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: bookResolvers.Query.book,
    },
  },
})

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: bookResolvers.Mutation.addBook,
    },
    deleteBook: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: bookResolvers.Mutation.deleteBook,
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve: bookResolvers.Mutation.updateBook,
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})

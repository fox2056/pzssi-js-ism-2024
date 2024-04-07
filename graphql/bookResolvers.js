const Book = require("../models/Book")

const bookResolvers = {
  Query: {
    books: () => Book.find(),
    book: (_, { id }) => Book.findById(id),
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const book = new Book({ title, author })
      return book.save()
    },
    deleteBook: (_, { id }) => Book.findByIdAndDelete(id),
    updateBook: (_, { id, title, author }) =>
      Book.findByIdAndUpdate(id, { $set: { title, author } }, { new: true }),
  },
}

module.exports = bookResolvers

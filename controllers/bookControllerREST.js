const Book = require("../models/Book")

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
    })
    //res.redirect("/")
    res.status(201).json(book)
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    })
  }
}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()

    //res.render("index", { books: books })
    res.status(200).json(books)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ status: "fail", message: "Book not found" })
    }
    //res.render("book", { book: book })
    res.status(200).json(book)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedBook) {
      return res.status(404).json({ status: "fail", message: "Book not found" })
    }
    //res.redirect("/")
    res.status(200).json(updatedBook)
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    })
  }
}

exports.deleteBook = async (req, res) => {
  // try {
  //   await Book.findByIdAndDelete(req.params.id)
  //   res.redirect("/")
  // } catch (err) {
  //   console.error(err) // Log the error for debugging
  //   res.status(500).json({
  //     // Send an error response to the client
  //     status: "fail",
  //     message: "Error deleting book",
  //   })
  // }
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if (!deletedBook) {
      return res.status(404).json({ status: "fail", message: "Book not found" })
    }
    res.status(204).json({ status: "success", message: "Book deleted" })
  } catch (err) {
    console.error(err) // Log the error for debugging
    res.status(500).json({ status: "fail", message: "Error deleting book" })
  }
}

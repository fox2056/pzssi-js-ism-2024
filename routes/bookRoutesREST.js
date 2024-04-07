const express = require("express")
const bookController = require("../controllers/bookControllerREST")

const router = express.Router()

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook)

router
  .route("/:id")
  .get(bookController.getBook)
  .delete(bookController.deleteBook)
  .patch(bookController.updateBook)

module.exports = router

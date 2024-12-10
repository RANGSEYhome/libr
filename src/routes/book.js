const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllors/book.js");

const {
  addBookSchema,
  updateBookSchema,
} = require("../common/Validation/index.js");
const { handleValidation } = require("../middlewares");

const { permission } = require("../middlewares");
const { actions } = require("../models/permission");

router.post(
  "/",
  permission(actions.CREATE_BOOK),
  addBookSchema,
  handleValidation,
  addBook
);
router.get("/", permission(actions.READ_BOOK), getBooks);
router.get("/:id", permission(actions.READ_BOOK), getBookById);
router.put(
  "/:id",
  permission(actions.EDIT_BOOK),
  updateBookSchema,
  handleValidation,
  updateBook
);
router.delete("/:id", permission(actions.DELETE_BOOK), deleteBook);

module.exports = router;

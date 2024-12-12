const BookModel = require("../models/book.js");
const asyncHandler = require("express-async-handler");
const { PaginationParameters } = require("mongoose-paginate-v2");

const getBooks = asyncHandler(async (req, res) => {
  const options = new PaginationParameters(req).get();
  // console.log(...options)
  const items = await BookModel.paginate(...options);
  return res.json(items);
});

const getBookById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const items = await BookModel.findById(id);
  return res.json(items);
});

const addBook = asyncHandler(async (req, res) => {
  const item = new BookModel(req.body);
  const result = await item.save();
  // Invalidate Catch

  return res.json(result);
});

const updateBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await BookModel.updateOne({ _id: id }, req.body);
  return res.json(result);
});

const deleteBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await BookModel.deleteOne({ _id: id });
  return res.json(result);
});

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};

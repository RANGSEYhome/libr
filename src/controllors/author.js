const AuthorModel = require("../models/author.js");
const asyncHandler = require("express-async-handler");
const { PaginationParameters } = require("mongoose-paginate-v2");

const getAuthors = asyncHandler(async (req, res) => {
  const options = new PaginationParameters(req).get();
  const authors = await AuthorModel.paginate(...options);
  return res.json(authors);
});

const getAuthorById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const items = await AuthorModel.findById(id);
  return res.json(items);
});

const addAuthor = asyncHandler(async (req, res) => {
  const item = new AuthorModel(req.body);
  const result = await item.save();
  return res.json(result);
});

const updateAuthor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await AuthorModel.updateOne({ _id: id }, req.body);
  return res.json(result);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await AuthorModel.deleteOne({ _id: id });
  return res.json(result);
});

module.exports = {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};

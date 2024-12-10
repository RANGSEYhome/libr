const GenreModel = require("../models/genre.js");
const asyncHandler = require("express-async-handler");
const { PaginationParameters } = require("mongoose-paginate-v2");

const getGenres = asyncHandler(async (req, res) => {
  const options = new PaginationParameters(req).get();
  const items = await GenreModel.paginate(...options);
  return res.json(items);
});

const getGenreById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const items = await GenreModel.findById(id);
  return res.json(items);
});

const addGenre = asyncHandler(async (req, res) => {
  const item = new GenreModel(req.body);
  const result = await item.save();
  return res.json(result);
});

const updateGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await GenreModel.updateOne({ _id: id }, req.body);
  return res.json(result);
});

const deleteGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await GenreModel.deleteOne({ _id: id });
  return res.json(result);
});

module.exports = {
  getGenres,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
};

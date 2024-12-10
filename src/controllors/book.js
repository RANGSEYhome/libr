const BookModel = require("../models/book.js");
const asyncHandler = require("express-async-handler");
// const redisClient = require('../redis/index.js')
const { PaginationParameters } = require("mongoose-paginate-v2");

// const getBooks = asyncHandler(async (req, res) => {
// //   const { join } = req.query;
// //   const populateFields = join ? join.split(',') : [];
// //   // Get all courses
// //   const items = await BookModel.find().populate(populateFields);
// //   return res.json(items);

//     // console.log("Hello")
//     // Get all courses
//     const key = '/books'
//     const result = await redisClient.get(key)
//     // console.log(result)
//     if (!result) {
//         // Query operation takes time
//         console.log("Consuming Time")
//         const items = await BookModel.find()
//         redisClient.set(key, JSON.stringify(items), {
//             EX: 30
//         })
//         return res.json(items)
//     }
//     const items = JSON.parse(result)
//     // console.log(result)
//     return res.json(items)
// });

// const getBooks = asyncHandler(async (req, res) => {
//     const { limit, page } = req.query
//     const options = {
//         limit: limit ? limit : -1,
//         page: page ? page : -1,
//         pagination: limit ? true : false
//     }
//     console.log(options)
//     const { join } = req.query
//     // Get all courses
//     // const books = await BookModel.find().populate(join)
//     const books = await BookModel.paginate({
//         pages: {
//             $gte: 50, $lte: 200
//         }
//     }, options)

//     return res.json(books)
// })

const getBooks = asyncHandler(async (req, res) => {
  const options = new PaginationParameters(req).get();
  // console.log(...options)
  const items = await BookModel.paginate(...options);

  return res.json(items);
});

// const getBookAQ = asyncHandler(async (req, res) => {
//     const items = await
// })

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

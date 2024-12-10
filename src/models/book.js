const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: mongoose.Types.ObjectId, ref: "Genres" },
  author: { type: mongoose.Types.ObjectId, ref: "Authors" },
  year: { type: Number },
  pages: { type: Number },
  cover: { type: String, default: null }, // Allow null for the cover
  createdDate: { type: Date, required: true, default: Date.now() },
});

bookSchema.plugin(mongoosePaginate);

bookSchema.index({
  title: "text",
  description: "text",
  genre: "text",
});

const BookModel = mongoose.model("Books", bookSchema);

module.exports = BookModel;

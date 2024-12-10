const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const genreSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdDate: { type: Date, required: true, default: Date.now() },
});

genreSchema.plugin(mongoosePaginate);

genreSchema.index({
  title: "text",
  description: "text",
});

const GenreModel = mongoose.model("Genres", genreSchema);

module.exports = GenreModel;

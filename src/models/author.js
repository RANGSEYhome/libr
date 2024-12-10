const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const authorSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  createdDate: { type: Date, required: true, default: Date.now() },
});

authorSchema.plugin(mongoosePaginate);

authorSchema.index({
  firstname: "text",
  lastname: "text",
});

const AuthorModel = mongoose.model("Authors", authorSchema);

module.exports = AuthorModel;

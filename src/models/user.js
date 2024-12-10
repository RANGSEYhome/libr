const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { roles } = require("./permission");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  refreshToken: { type: String },
  type: { type: String, default: "PW" },
  permission: {
    type: String,
    enum: [roles.ADMIN.role, roles.EDITOR.role, roles.USER.role],
    default: roles.USER.role,
  },
  createdDate: { type: Date, required: true, default: new Date() },
});

userSchema.plugin(mongoosePaginate);

userSchema.index({
  firstname: "text",
  lastname: "text",
  email: "text",
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;

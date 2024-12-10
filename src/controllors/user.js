const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.js");
const { PaginationParameters } = require("mongoose-paginate-v2");

/**
 * Controller is a specific function to handle specific tasks
 */

const createUser = asyncHandler(async (req, res) => {
  const item = new UserModel(req.body);
  const result = await item.save();
  return res.json(result);
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await UserModel.findById(id);
  return res.json(item);
});

const getUsers = asyncHandler(async (req, res) => {
  const options = new PaginationParameters(req).get();
  const items = await UserModel.paginate(...options);
  return res.json(items);
});

const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await UserModel.deleteOne({ _id: id });
  return res.json(result);
});

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await UserModel.updateOne({ _id: id }, req.body);
  return res.json(result);
});

module.exports = {
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
};

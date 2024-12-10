const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllors/user");
const userRouter = express.Router();

const {
  signUpSchema,
  updateUserSchema,
} = require("../common/Validation/index.js");
const { handleValidation } = require("../middlewares");

const { permission } = require("../middlewares");
const { actions } = require("../models/permission");

userRouter.post(
  "/",
  permission(actions.CREATE_USER),
  signUpSchema,
  handleValidation,
  createUser
);
userRouter.get("/", permission(actions.READ_USER), getUsers);
userRouter.get("/:id", permission(actions.READ_USER), getUserById);
userRouter.put(
  "/:id",
  permission(actions.EDIT_USER),
  updateUserSchema,
  handleValidation,
  updateUserById
);
userRouter.delete("/:id", permission(actions.DELETE_USER), deleteUserById);

module.exports = userRouter;

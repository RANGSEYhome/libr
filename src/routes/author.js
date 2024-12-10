const express = require("express");
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllors/author.js");

const {
  addAuthorSchema,
  updateAuthorSchema,
} = require("../common/Validation/index.js");
const { handleValidation } = require("../middlewares");

const { permission } = require("../middlewares");
const { actions } = require("../models/permission");

router.post(
  "/",
  permission(actions.CREATE_AUTHOR),
  addAuthorSchema,
  handleValidation,
  addAuthor
);
router.get("/", permission(actions.READ_AUTHOR), getAuthors);
router.get("/:id", permission(actions.READ_AUTHOR), getAuthorById);
router.put(
  "/:id",
  permission(actions.EDIT_AUTHOR),
  updateAuthorSchema,
  handleValidation,
  updateAuthor
);
router.delete("/:id", permission(actions.DELETE_AUTHOR), deleteAuthor);

module.exports = router;

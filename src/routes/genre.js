const express = require("express");
const router = express.Router();
const {
  getGenres,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
} = require("../controllors/genre.js");

const {
  addGenreSchema,
  updateGenreSchema,
} = require("../common/Validation/index.js");
const { handleValidation } = require("../middlewares");

const { permission } = require("../middlewares");
const { actions } = require("../models/permission");

router.post(
  "/",
  permission(actions.CREATE_GENRE),
  addGenreSchema,
  handleValidation,
  addGenre
);
router.get("/", permission(actions.READ_GENRE), getGenres);
router.get("/:id", permission(actions.READ_GENRE), getGenreById);
router.put(
  "/:id",
  permission(actions.EDIT_GENRE),
  updateGenreSchema,
  handleValidation,
  updateGenre
);
router.delete("/:id", permission(actions.DELETE_GENRE), deleteGenre);

module.exports = router;

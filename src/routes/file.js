const express = require("express");
const {
  handleUpload,
  getFile,
  handleUploads,
  handleS3Upload,
  getAllFiles,
  deleteFileS3,
} = require("../controllors/file.js");
const { singleUpload, multipleUploads } = require("../middlewares");
const uploadS3 = require("../middlewares/uploadS3");
const fileRouter = express.Router();

const { permission } = require("../middlewares");
const { actions } = require("../models/permission");

fileRouter.post(
  "/upload-single",
  permission(actions.CREATE_FILE),
  singleUpload,
  handleUpload
);
fileRouter.post(
  "/upload-multiple",
  permission(actions.CREATE_FILE),
  multipleUploads,
  handleUploads
);
fileRouter.post(
  "/upload-single-s3",
  permission(actions.CREATE_FILE),
  uploadS3,
  handleS3Upload
);
fileRouter.get("/", permission(actions.READ_FILE), getAllFiles);
fileRouter.get("/:id", permission(actions.READ_FILE), getFile);
fileRouter.delete("/s3/:id", permission(actions.DELETE_FILE), deleteFileS3);

module.exports = fileRouter;

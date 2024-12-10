const Joi = require("@hapi/joi");

module.exports = {
  // Upload single file
  0: {
    body: {
      file: Joi.object()
        .required()
        .custom((value, helpers) => {
          if (!value || !value.filename) {
            return helpers.message("File is required.");
          }
          return value; // Everything is fine
        })
        .description("The file to upload"),
    },
    model: "uploadSingleFile", // Name of the model
    group: "File", // Swagger tag for APIs
    description: "Upload a single file",
  },
  // Upload multiple files
  1: {
    body: {
      files: Joi.array()
        .items(
          Joi.object()
            .required()
            .custom((value, helpers) => {
              if (!value || !value.filename) {
                return helpers.message("Each file is required.");
              }
              return value; // Everything is fine
            })
        )
        .required(),
    },
    model: "uploadMultipleFiles", // Name of the model
    group: "File", // Swagger tag for APIs
    description: "Upload multiple files",
  },
  // Upload single file s3
  2: {
    body: {
      file: Joi.object()
        .required()
        .custom((value, helpers) => {
          if (!value || !value.filename) {
            return helpers.message("File is required.");
          }
          return value; // Everything is fine
        })
        .description("The file to upload"),
    },
    model: "uploadSingleS3", // Name of the model
    group: "File", // Swagger tag for APIs
    description: "Upload a single file",
  },
  // Get all files
  3: {
    query: {
      limit: Joi.number()
        .optional()
        .default(10)
        .description("Number of items to take"),
      page: Joi.number().optional().default(1),
      sort: Joi.string().optional(),
      query: Joi.string().optional(),
    },
    model: "getAllFiles", // Name of the model
    group: "File", // Swagger tag for APIs
    description: "Get all uploaded files",
  },
  // Get file by ID
  4: {
    path: {
      id: Joi.string().required().description("The ID of the file to retrieve"),
    },
    group: "File", // Swagger tag for APIs
    description: "Get file by ID",
  },
  // Delete file by ID
  5: {
    path: {
      id: Joi.string().required().description("The ID of the file to delete"),
    },
    group: "File", // Swagger tag for APIs
    description: "Delete file by ID",
  },
};

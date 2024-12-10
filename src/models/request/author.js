const Joi = require("@hapi/joi");

module.exports = {
  // Create
  0: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
      email: Joi.string().email().required(),
    },
    model: "createAuthor", // Name of the model
    group: "Author", // Swagger tag for apis.
    description: "Create author and save details in database",
  },
  // Get all
  1: {
    query: {
      limit: Joi.number()
        .optional()
        .default(10)
        .description("Number of items to take"),
      page: Joi.number().optional().default(1),
      sort: Joi.string().optional(),
      query: Joi.string().optional(),
      populate: Joi.string().optional(),
      select: Joi.string().optional(),
    },
    model: "getAllAuthors",
    group: "Author",
    description: "Get all authors",
  },
  // Get by Id
  2: {
    path: {
      id: Joi.string().required(),
    },
    group: "Author", // Swagger tag for apis.
    description: "Get author by Id",
  },
  // Update
  3: {
    path: {
      id: Joi.string().required(),
    },
    body: {
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
      dateOfBirth: Joi.date().optional(),
      email: Joi.string().email().optional(),
    },
    model: "updateAuthor", // Name of the model
    group: "Author", // Swagger tag for apis.
    description: "Update author and save details in database",
  },
  // Delete
  4: {
    path: {
      id: Joi.string().required(),
    },
    group: "Author", // Swagger tag for apis.
    description: "Delete author by Id",
  },
};

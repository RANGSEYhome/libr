const Joi = require("@hapi/joi");

module.exports = {
  // Create
  0: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
    model: "createGenre", // Name of the model
    group: "Genre", // Swagger tag for apis.
    description: "Create genre and save details in database",
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
    model: "getAllGenres",
    group: "Genre",
    description: "Get all genres",
  },
  // Get by Id
  2: {
    path: {
      id: Joi.string().required(),
    },
    group: "Genre", // Swagger tag for apis.
    description: "Get genre by Id",
  },
  // Update
  3: {
    path: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    },
    model: "updateGenre", // Name of the model
    group: "Genre", // Swagger tag for apis.
    description: "Update genre and save details in database",
  },
  // Delete
  4: {
    path: {
      id: Joi.string().required(),
    },
    group: "Genre", // Swagger tag for apis.
    description: "Delete genre by Id",
  },
};

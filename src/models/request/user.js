const Joi = require("@hapi/joi");
module.exports = {
  // Create
  0: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
    model: "createUser", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Create user and save details in database",
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
    model: "getAllUsers",
    group: "User",
    description: "Get all users",
  },
  // Get by Id
  2: {
    path: {
      id: Joi.string().required(),
    },
    group: "User", // Swagger tag for apis.
    description: "Get user by Id",
  },
  // Update
  3: {
    path: {
      id: Joi.string().required(),
    },
    body: {
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
      confirmPassword: Joi.string().optional(),
    },
    model: "updateUser", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Update user and save details in database",
  },
  // Delete
  4: {
    path: {
      id: Joi.string().required(),
    },
    group: "User", // Swagger tag for apis.
    description: "Delete user by Id",
  },
};

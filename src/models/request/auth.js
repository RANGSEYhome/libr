const Joi = require("@hapi/joi");

module.exports = {
  // create
  0: {
    body: {
      firstname: Joi.string().required().default("Rangsey"),
      lastname: Joi.string().required().default("HENG"),
      email: Joi.string().required().default("info.rangsey1@gmail.com"),
      password: Joi.string().required().default("123456789"),
      confirmPassword: Joi.string().required().default("123456789"),
    },
    model: "signUp", // Name of the model
    group: "Authentication", // Swagger tag for apis.
    description: "Sign up user",
  },
  1: {
    body: {
      email: Joi.string().required().default("info.rangsey1@gmail.com"),
      password: Joi.string().required().default("123456789"),
    },
    model: "login", // Name of the model
    group: "Authentication", // Swagger tag for apis.
    description: "Login user",
  },
  2: {
    group: "Authentication",
  },
  3: {
    group: "Authentication",
  },
  4: {
    group: "Authentication",
  },
  5: {
    group: "Authentication",
  },
};

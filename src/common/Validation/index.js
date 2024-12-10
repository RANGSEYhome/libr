const { checkSchema } = require("express-validator");

// const signUpSchema = checkSchema({
//     email: {
//         isEmail: true,
//         errorMessage: 'Invalid email address',
//     },
//     lastname: {
//         isAlpha: true,
//         errorMessage: 'First name is text only',
//     },
//     firstname: {
//         isAlpha: true,
//         errorMessage: 'Last name is text only',
//     },
//     password: {
//         isLength: {
//             options: {
//                 min: 8
//             }
//         },
//         errorMessage: "Password should be at least 8 characters"
//     },
//     confirmPassword: {
//         custom: {
//             options: async (value, { req }) => {
//                 if (value != req.body.password) {
//                     throw new Error("Password doesn't match!")
//                 }
//             }
//         }
//     }
// })

const signUpSchema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  lastname: {
    notEmpty: {
      errorMessage: "Last name is required",
    },
    isAlpha: {
      errorMessage: "Last name must contain only letters",
    },
  },
  firstname: {
    notEmpty: {
      errorMessage: "First name is required",
    },
    isAlpha: {
      errorMessage: "First name must contain only letters",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 characters",
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: "Confirm password is required",
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match!");
        }
        return true; // Return true for valid passwords
      },
    },
  },
});

const updateUserSchema = checkSchema({
  email: {
    optional: true, // Field is optional for update
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  lastname: {
    optional: true, // Field is optional for update
    isAlpha: {
      errorMessage: "Last name must contain only letters",
    },
  },
  firstname: {
    optional: true, // Field is optional for update
    isAlpha: {
      errorMessage: "First name must contain only letters",
    },
  },
  password: {
    optional: true, // Field is optional for update
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 characters",
    },
  },
  confirmPassword: {
    optional: true, // Field is optional for update
    custom: {
      options: (value, { req }) => {
        if (value && value !== req.body.password) {
          throw new Error("Passwords do not match!");
        }
        return true; // Return true for valid passwords
      },
    },
  },
});

// const addBookSchema = checkSchema({
//     pages: {
//         // isNumeric: { value: true, errorMessage: "Page should be number"},
//         isInt: {
//             options: {
//                 min: 1, max: 1000
//             },
//             errorMessage: "Page should be number with value between 1 to 1000"
//         },

//     },

// })

const addBookSchema = checkSchema({
  title: {
    isString: {
      errorMessage: "Title must be a string.",
    },
    notEmpty: {
      errorMessage: "Title is required.",
    },
    trim: true,
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
  pages: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Pages must be a positive integer.",
    },
  },
  author: {
    isMongoId: {
      errorMessage: "Author must be a valid MongoDB ObjectId.",
    },
  },
  year: {
    optional: true,
    isInt: {
      options: { min: 1000, max: new Date().getFullYear() },
      errorMessage: `Year must be between 1000 and ${new Date().getFullYear()}.`,
    },
  },
  genre: {
    optional: true,
    isMongoId: {
      errorMessage: "Genre must be a valid MongoDB ObjectId.",
    },
  },
  cover: {
    optional: true,
    isString: {
      errorMessage: "Cover must be a string.",
    },
  },
});

const updateBookSchema = checkSchema({
  title: {
    optional: true,
    isString: {
      errorMessage: "Title must be a string.",
    },
    notEmpty: {
      errorMessage: "Title cannot be empty if provided.",
    },
    trim: true,
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
  pages: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Pages must be a positive integer.",
    },
  },
  author: {
    optional: true,
    isMongoId: {
      errorMessage: "Author must be a valid MongoDB ObjectId.",
    },
  },
  year: {
    optional: true,
    isInt: {
      options: { min: 1000, max: new Date().getFullYear() },
      errorMessage: `Year must be between 1000 and ${new Date().getFullYear()}.`,
    },
  },
  genre: {
    optional: true,
    isMongoId: {
      errorMessage: "Genre must be a valid MongoDB ObjectId.",
    },
  },
  cover: {
    optional: true,
    isString: {
      errorMessage: "Cover must be a string.",
    },
  },
});

const addAuthorSchema = checkSchema({
  firstname: {
    notEmpty: {
      errorMessage: "First name is required",
    },
    isAlpha: {
      errorMessage: "First name must contain only letters",
    },
  },
  lastname: {
    notEmpty: {
      errorMessage: "Last name is required",
    },
    isAlpha: {
      errorMessage: "Last name must contain only letters",
    },
  },
  dateOfBirth: {
    notEmpty: {
      errorMessage: "Date of birth is required",
    },
    isISO8601: {
      errorMessage: "Date of birth must be a valid date in ISO8601 format",
    },
    toDate: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
});

const updateAuthorSchema = checkSchema({
  firstname: {
    optional: true,
    isAlpha: {
      errorMessage: "First name must contain only letters",
    },
  },
  lastname: {
    optional: true,
    isAlpha: {
      errorMessage: "Last name must contain only letters",
    },
  },
  dateOfBirth: {
    optional: true,
    isISO8601: {
      errorMessage: "Date of birth must be a valid date in ISO8601 format",
    },
    toDate: true,
  },
  email: {
    optional: true,
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
});

const addGenreSchema = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "Title is required.",
    },
    isString: {
      errorMessage: "Title must be a string.",
    },
    trim: true,
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
});

const updateGenreSchema = checkSchema({
  title: {
    optional: true,
    isString: {
      errorMessage: "Title must be a string.",
    },
    trim: true,
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string.",
    },
    trim: true,
  },
});

module.exports = {
  signUpSchema,
  updateUserSchema,
  addBookSchema,
  updateBookSchema,
  addAuthorSchema,
  updateAuthorSchema,
  addGenreSchema,
  updateGenreSchema,
};

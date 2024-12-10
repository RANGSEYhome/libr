// const { permission } = require("../middlewares");

const actions = {
  // Create
  CREATE_USER: "CREATE_USER",
  CREATE_BOOK: "CREATE_BOOK",
  CREATE_FILE: "CREATE_FILE",
  CREATE_AUTHOR: "CREATE_AUTHOR",
  CREATE_GENRE: "CREATE_GENRE",

  // Read
  READ_USER: "READ_USER",
  READ_BOOK: "READ_BOOK",
  READ_FILE: "READ_FILE",
  READ_AUTHOR: "READ_AUTHOR",
  READ_GENRE: "READ_GENRE",

  // Edit
  EDIT_USER: "EDIT_USER",
  EDIT_BOOK: "EDIT_BOOK",
  EDIT_FILE: "EDIT_FILE",
  EDIT_AUTHOR: "EDIT_AUTHOR",
  EDIT_GENRE: "EDIT_GENRE",

  // Delete
  DELETE_USER: "DELETE_USER",
  DELETE_BOOK: "DELETE_BOOK",
  DELETE_FILE: "DELETE_FILE",
  DELETE_AUTHOR: "DELETE_AUTHOR",
  DELETE_GENRE: "DELETE_GENRE",
};

const roles = {
  ADMIN: {
    role: "ADMIN",
    permissions: Object.keys(actions),
  },
  EDITOR: {
    role: "EDITOR",
    permissions: [
      actions.CREATE_BOOK,
      actions.READ_USER,
      actions.READ_BOOK,
      actions.READ_FILE,
      actions.READ_AUTHOR,
      actions.READ_GENRE,
    ],
  },
  USER: {
    role: "USER",
    permissions: [actions.READ_BOOK, actions.READ_FILE],
  },
};

module.exports = { actions, roles };

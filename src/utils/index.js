const jwt = require("jsonwebtoken");

function signJWT(id, email, username) {
  const token = jwt.sign(
    { id: id, email: email, username: username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRE }
  );
  // return token
  const refreshToken = jwt.sign(
    { id: id, email: email, username: username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
  return { token, refreshToken };
}

module.exports = { signJWT };

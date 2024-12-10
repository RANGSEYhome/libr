const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { responseHandler } = require("express-intercept");
const redisClient = require("../redis");
const UserModel = require("../models/user");
// File Upload
const multer = require("multer");
const path = require("path");

const { roles } = require("../models/permission");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const extract = token.split(" ")[1];
  const decoded = jwt.verify(extract, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

function handleError(error, req, res, next) {
  return res.status(500).json(error.message);
}

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const cacheInterceptor = (ttl) =>
  responseHandler()
    .for((req) => req.method == "GET")
    .if((res) => {
      const codes = [200, 201, 202, 203, 204];
      return codes.includes(res.statusCode);
    })
    .getString(async (body, req, res) => {
      const { originalUrl } = res.req;
      redisClient.set(originalUrl, body, {
        EX: ttl,
      });
    });

const invalidateInterceptor = responseHandler()
  .for((req) => {
    const methods = ["POST", "PUT", "PATCH", "DELETE"];
    return methods.includes(req.method);
  })
  .if((res) => {
    const codes = [200, 201, 202, 203, 204];
    return codes.includes(res.statusCode);
  })
  .getString(async (body, req, res) => {
    const { baseUrl } = req;
    console.log(baseUrl);
    const keys = await redisClient.keys(`${baseUrl}*`);
    // console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      redisClient.del(keys[i]);
    }
  });

const cacheMiddleware = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req;
  if (req.method == "GET") {
    const data = await redisClient.get(originalUrl);
    if (data !== null) {
      return res.json(JSON.parse(data));
    }
  }
  next();
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const singleUpload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

const multipleUploads = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("files");

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"), false);
  }
}

const verifyRefresh = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const extract = token.split(" ")[1];
  const decoded = jwt.verify(extract, process.env.JWT_REFRESH_SECRET);
  const user = await UserModel.findById(decoded.id);
  // console.log(user)
  req.user = { ...user._doc, extract };
  // console.log(req.user)
  next();
});

const checkRole = (action, role) => {
  console.log(`Checking action "${action}" for role "${role}"`);
  console.log(roles[role].permissions);
  return roles[role].permissions.includes(action);
};

const permission = (action) =>
  asyncHandler((req, res, next) => {
    const user = req.user;
    if (!checkRole(action, user.permission)) {
      return res.json({ msg: "Unauthorized" });
    }
    next();
  });

module.exports = {
  handleError,
  verifyJWT,
  handleValidation,
  cacheInterceptor,
  cacheMiddleware,
  invalidateInterceptor,
  singleUpload,
  multipleUploads,
  verifyRefresh,
  permission,
};

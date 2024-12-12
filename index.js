require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { Redis } = require("ioredis");
const compression = require("compression");
const timeout = require("connect-timeout");

const {
  handleError,
  cacheMiddleware,
  cacheInterceptor,
  invalidateInterceptor,
} = require("./src/middlewares/index.js");

const dbConnect = require("./src/db/db.js");
const bookRouter = require("./src/routes/book.js");
const authorRouter = require("./src/routes/author.js");
const genreRouter = require("./src/routes/genre.js");
const userRouter = require("./src/routes/user.js");
const authRouter = require("./src/routes/auth.js");
const jwtStrategy = require("./src/common/strategy/jwt.js");
const redisClient = require("./src/redis/index.js");
const fileRouter = require("./src/routes/file.js");

const cors = require("cors");
const { createAdapter } = require("@socket.io/redis-adapter");
const setupSwagger = require("./src/swagger/index.js");

const pubClient = new Redis({
  port: 6379, // Redis port
  host: process.env.CACHE_SERVER, // Redis host
});
const subClient = pubClient.duplicate();

const app = express();

app.use(timeout("5s"));
app.use(compression());

app.use(cors());
const server = createServer(app, (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
    // 'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (["GET", "POST"].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    // console.log("Hello World")
    res.end("Hello World");
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  adapter: createAdapter(pubClient, subClient),
});

dbConnect().catch((err) => {
  console.log(err);
});
// redisClient.connect()

const limiter = (ttl, max) =>
  rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
    }),

    windowMs: ttl, // 1 minutes
    max, // Limit each IP to 100 requests per windowMs
    message: { msg: "Too many requests from this IP, please try again later." },
  });
// console.log("Restart")

const loginLimit = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs:
    (parseInt(process.env.LOGIN_LIMIT_WINDOW_MINUTES, 10) || 5) * 60 * 1000, // Convert minutes to milliseconds
  max: parseInt(process.env.LOGIN_LIMIT_MAX_REQUESTS, 10) || 5, // Default to 5 requests if not set
  message: { msg: "Too many login attempt" },
});

passport.use(jwtStrategy);

// app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
// app.use(logger)

app.use("/health-check", (req, res) => {
  return res.status(200).json({ msg: "Up" });
});

app.use(`/${process.env.API_VERSION}/auth`, loginLimit, authRouter);
// app.use(limiter);

//Redis Cache
// app.use(cacheMiddleware)
// app.use(cacheInterceptor(30 * 60));
// app.use(invalidateInterceptor);

// Cachable Routes
app.use(
  `/${process.env.API_VERSION}/authors`,
  limiter(
    (parseInt(process.env.SRC_LIMIT_WINDOW_MINUTES, 10) || 1) * 60 * 1000, // Convert minutes to milliseconds
    parseInt(process.env.SRC_LIMIT_MAX_REQUESTS, 10) || 60 // Default to 60 requests
  ),
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(
    (parseInt(process.env.CACHE_INTERCEPTOR_TTL, 10) || 3) * 60 // Convert minutes to seconds for the cache
  ),
  invalidateInterceptor,
  authorRouter
);
app.use(
  `/${process.env.API_VERSION}/genres`,
  limiter(
    (parseInt(process.env.SRC_LIMIT_WINDOW_MINUTES, 10) || 1) * 60 * 1000, // Convert minutes to milliseconds
    parseInt(process.env.SRC_LIMIT_MAX_REQUESTS, 10) || 60 // Default to 60 requests
  ),
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(
    (parseInt(process.env.CACHE_INTERCEPTOR_TTL, 10) || 3) * 60 // Convert minutes to seconds for the cache
  ),
  invalidateInterceptor,
  genreRouter
);
app.use(
  `/${process.env.API_VERSION}/books`,
  limiter(
    (parseInt(process.env.SRC_LIMIT_WINDOW_MINUTES, 10) || 1) * 60 * 1000, // Convert minutes to milliseconds
    parseInt(process.env.SRC_LIMIT_MAX_REQUESTS, 10) || 60 // Default to 60 requests
  ),
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(
    (parseInt(process.env.CACHE_INTERCEPTOR_TTL, 10) || 3) * 60 // Convert minutes to seconds for the cache
  ),
  invalidateInterceptor,
  bookRouter
);
app.use(
  `/${process.env.API_VERSION}/files`,
  limiter(
    (parseInt(process.env.SRC_LIMIT_WINDOW_MINUTES, 10) || 1) * 60 * 1000, // Convert minutes to milliseconds
    parseInt(process.env.SRC_LIMIT_MAX_REQUESTS, 10) || 60 // Default to 60 requests
  ),
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(
    (parseInt(process.env.CACHE_INTERCEPTOR_TTL, 10) || 3) * 60 // Convert minutes to seconds for the cache
  ),
  invalidateInterceptor,
  fileRouter
);

// app.use('/chats', chatRouter)
app.use(handleError);

app.use(
  `/${process.env.API_VERSION}/users`,
  limiter(
    (parseInt(process.env.SRC_LIMIT_WINDOW_MINUTES, 10) || 1) * 60 * 1000, // Convert minutes to milliseconds
    parseInt(process.env.SRC_LIMIT_MAX_REQUESTS, 10) || 60 // Default to 60 requests
  ),
  passport.authenticate("jwt", { session: false }),
  cacheMiddleware,
  cacheInterceptor(
    (parseInt(process.env.CACHE_INTERCEPTOR_TTL, 10) || 3) * 60 // Convert minutes to seconds for the cache
  ),
  invalidateInterceptor,
  userRouter
);

setupSwagger(app);

server.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
});

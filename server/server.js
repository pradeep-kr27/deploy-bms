const express = require("express");

const helmet = require("helmet");
const app = express();
app.use(helmet());

require("dotenv").config(); // loads the environment variables from a .env file into process.env
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const moviesRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

connectDB();

app.use(express.json());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// apply rate limiter to all requests
app.use("/api/", apiLimiter);
/** Routes */
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.listen(8082, () => {
  console.log("Server is running at port 8082");
});

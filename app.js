const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/userRoute");
const tweetRoute = require("./routes/tweetRoute");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public/uploads`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", UserRoute);
app.use("/tweet", tweetRoute);

module.exports = app;

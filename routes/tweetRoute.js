const express = require("express");
const tweet = require("../controller/tweetController");
var router = express.Router();
const auth = require("../middleware/auth");

router.route("/").get(tweet.allTweets);
// .post(user.registerUser);

router
  .route("/add")
  .get(auth.verifyUser,tweet.allTweets)
  .post(
    auth.verifyUser,
    tweet.uploadImage,
    tweet.addTweet);

module.exports = router;

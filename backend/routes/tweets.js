import express from "express";
import multer from "multer";
import { verifyToken } from "../Token.js";
import { createTweet, deleteTweet, getAllTweets, getExploreTweets, getUserTweets, likeOrDislike, retweet } from "../controllers/tweet.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
// Create a Tweet
router.post("/", verifyToken,upload.single("image") ,createTweet);

// Delete a Tweet
router.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a Tweet
router.put("/:id/like", likeOrDislike);

// Retweet a Tweet
router.post("/:id/retweet", retweet);
// get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// get user Tweets only
router.get("/user/all/:id", getUserTweets);

//explore
router.get("/explore", getExploreTweets);
export default router;
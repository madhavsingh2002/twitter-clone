import Tweet from "../models/TweetModel.js";
import { handleError } from "../error.js";
import User from "../models/UserModel.js";

// export const createTweet = async (req, res, next) => {
//   const newTweet = new Tweet(req.body);
//   try {
//     const savedTweet = await newTweet.save();
//     res.status(200).json(savedTweet);
//   } catch (err) {
//     handleError(500, err);
//   }
// };
export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError(500, err);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("tweet has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};
export const retweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id); // Find the tweet to retweet

    const user = await User.findById(req.body.userId); // Find the user performing the retweet
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the user has already retweeted the tweet
    if (!tweet.retweet.includes(user.id)) {
      // If not, add the retweet
      await tweet.updateOne({ $push: { retweets: user.id } });
      res.status(200).json({ message: "Tweet has been retweeted" });
    } else {
      // If already retweeted, remove the retweet
      await tweet.updateOne({ $pull: { retweets: user.id } });
      res.status(200).json({ message: "Retweet has been removed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};
export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};
import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";

import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHashtag, faHeart, faHouse, faRetweet, faUser } from '@fortawesome/free-solid-svg-icons'
import './Tweet.css'
const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
        console.log(findUser.data)
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleRetweet = async (e) => {
    e.preventDefault();
  
    try {
      const retweet = await axios.put(`/tweets/${tweet._id}/retweet`, {
        userId: currentUser._id, // Change "id" to "userId" to match the backend
      });
  
      if (retweet.data.message === "Tweet has been retweeted") {
        // Depending on the response message, you can update your UI or perform any other action
        console.log("Tweet has been retweeted");
      } else if (retweet.data.message === "Retweet has been removed") {
        // Depending on the response message, you can update your UI or perform any other action
        console.log("Retweet has been removed");
      }
  
      // You might want to refresh your data or UI based on the retweet action
      // For example, fetch updated data after retweeting
  
    } catch (err) {
      console.log("error", err);
    }
  };
  

  return (
    <div>
      {userData && (
        <>
          <div className="d-flex gap-2">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h4 className="fw-bold">{userData.userName}</h4>
            </Link>

            <span  className="fw-normal">@{userData.userName}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          {tweet.image && (
            <img src={`/tweets/${tweet.image}`} alt="Tweet Image" className="tweet-image" />
          )}
          <button onClick={handleLike} style={{border:'none',background:'none'}}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="me-2 my-2 cursor-pointer"></FavoriteIcon>
              // <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FavoriteBorderIcon className="me-2 my-2 cursor-pointer"></FavoriteBorderIcon>
              // <i className="fa-regular fa-heart"></i>
            )}
            {tweet.likes.length}
          </button>
          <button onClick={handleRetweet} style={{border:'none',background:'none'}}>
          <FontAwesomeIcon icon={faRetweet} />
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;
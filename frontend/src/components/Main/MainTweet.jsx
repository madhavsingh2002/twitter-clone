import React, { useState } from "react";
// import TimelineTweet from "../TimelineTweet/TimelineTweet";

import { useSelector } from "react-redux";
import axios from "axios";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import Swal from "sweetalert2";
const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!tweetText) {
  //       Swal.fire("Error", "Please enter tweet text", "error");
  //       return;
  //     }
  //     const submitTweet = await axios.post("/tweets", {
  //       userId: currentUser._id,
  //       description: tweetText,
  //       image:file
  //     });

  //     window.location.reload(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!tweetText) {
          Swal.fire("Error", "Please enter tweet text", "error");
          return;
        }
        const formData = new FormData();
      formData.append("userId", currentUser._id);
      formData.append("description", tweetText);
      if (file) {
        formData.append("image", file);
      }
         axios.post("/tweets",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Success", "Tweet created successfully", "success");
        console.log(formData)
      setTweetText("");
      setFile(null);
        window.location.reload(false);
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "An error occurred while creating the tweet", "error");
      }
    };
  return (
    <div>
      {currentUser && (
        <p className="fw-bold pl-2 my-2">{currentUser.userName}</p>
      )}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ background: "#0099ff" }}
      >
        Create Tweet
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create tweet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="border-bottom pb-4" onSubmit={handleSubmit}>
                <textarea
                  onChange={(e) => setTweetText(e.target.value)}
                  type="text"
                  placeholder="What's happening"
                  maxLength={280}
                  required={true}
                  style={{height:'100px', padding:'20px',width:'100%'}}
                  // className="bg-slate-200 rounded-lg w-full p-2 mt-3"
                ></textarea>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Share Picture for better experience
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => setFile(e.target.files[0])}
                    
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-white py-2 px-4  ms-auto"
                  style={{ borderRadius: "24px" }}
                >
                  Tweet
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ background: "#0099ff" }}
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <TimelineTweet />
    </div>
  );
};

export default MainTweet;

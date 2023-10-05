import React, { useState, useEffect } from "react";
import Sidebarleft from "../../components/Navbar/Sidebar/Sidebarleft";
import Sidebarright from "../../components/Navbar/Sidebar/Sidebarright";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";
import Swal from "sweetalert2";
import { following } from "../../redux/userSlice";
import EditProfile from "../../components/EditProfile/EditProfile";
import { changeProfile, logout } from "../../redux/userSlice";

function Profile() {
 
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [tweetText, setTweetText] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "user data not available at this moment",
        });
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(`/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(`/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  const handleDelete = async () => {
    const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
    Swal.fire({
      icon: "success",
      title: "User successfully Deleted",
    });
    dispatch(logout());
    navigate("/signin");
  };
  
  return (
    <>
<div className="row">
        <div className="col-md-3">
          <Sidebarleft />
        </div>
        <div className="col-6 px-4" style={{borderRight:'1px solid #D3D3D3e',borderLeft:'1px solid #D3D3D3'}}>
          <div className="flex justify-between items-center">
            <img
              src="data:image/png;base64,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"
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser._id === id ? (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ background: "#0099ff" }}
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                className=""
                onClick={handleFollow} style={{color:'blue',padding:'5px 10px',border:'1px solid blue',background:'none'}}
              >
                Following
              </button>
            ) : (
              <button
                className="bg-primary"
                style={{color:'white',padding:'5px 10px',border:'none'}}
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="col-md-3">
          <Sidebarright />
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="border-bottom pb-4" >
                  <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">
                      Profile Picture
                    </label>
                    <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    
                    
                  />

                  </div>
                  <button
                  // onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary text-white py-2 px-4  ms-auto"
                  style={{ borderRadius: "24px" }}
                >
                  Edit Profile
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
                
                
                
                <button
                  // onClick={handleSubmit}
                  className="btn  text-white py-2 px-4  ms-auto" onClick={handleDelete}
                  style={{ borderRadius: "24px" ,background:'#ff4d4d'}}
                >
                  Delete Account
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {open && <EditProfile setOpen={setOpen} />} */}
    </>
  );
}
export default Profile;

import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice.js";
import Swal from "sweetalert2";
function Sidebarleft() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "User successfully logout",
    });
    dispatch(logout());
  };
  const linkStyle = {
    color: "#121212",
    cursor: "pointer",
  };

  const linkHoverStyle = {
    color: 'blue',
  

  };
  return (
    <div className="d-flex flex-column h-100 vh-md-90 justify-content-between me-6">
      <div className="mt-6 d-flex flex-column gap-4">
        <Link
          to="/"
          className="d-flex"
          style={linkStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.color = linkHoverStyle.color;
            // Add any other hover style changes here
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = linkStyle.color;
            // Revert back to the original styles on mouse out
          }}
        >
          <div className="d-flex align-items-center gap-3 p-2 rounded-circle bg-hover-slate-200 cursor-pointer">
            <FontAwesomeIcon icon={faHouse} />
            <p>Home</p>
          </div>
        </Link>
        <Link
          to="/explore"
          className="d-flex"
          style={linkStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.color = linkHoverStyle.color;
            // Add any other hover style changes here
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = linkStyle.color;
            // Revert back to the original styles on mouse out
          }}
        >
          <div className="d-flex align-items-center gap-3 p-2 rounded-circle bg-hover-slate-200 cursor-pointer">
            <FontAwesomeIcon icon={faHashtag} />
            <p>Explore</p>
          </div>
        </Link>
        <Link
          to={`/profile/${currentUser._id}`}
          className="d-flex"
          style={linkStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.color = linkHoverStyle.color;
            // Add any other hover style changes here
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = linkStyle.color;
            // Revert back to the original styles on mouse out
          }}
        >
          <div className="d-flex align-items-center gap-3 p-2 rounded-circle bg-hover-slate-200 cursor-pointer">
            <FontAwesomeIcon icon={faUser} />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <p className="fw-bold">{currentUser.userName}</p>
          <p className="fw-bold">@{currentUser.userName}</p>
        </div>
        <div>
          <Link to="/signin">
            <button
              // className="bg-red-500 px-4 py-2 text-white rounded-full"
              style={{
                background: "#ff1a1a ",
                color: "white",
                borderRadius: "20px",
              }}
              onClick={handleLogout}
              className="px-4 py-2 "
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebarleft;

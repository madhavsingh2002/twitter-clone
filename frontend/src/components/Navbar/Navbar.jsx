import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "./logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceHolder/UserPlaceholder";
function Navbar() {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <>
      <div className="col-md-8 mx-auto" >
        <div className="row my-5 justify-content-between">
          <div className="col-12 col-md-3">
            <Link to="/">
              <img src={Logo} width={"40px"} className="ml-8" />
            </Link>
          </div>

          <div className="col-12 col-md-3">
            <div className="d-flex justify-content-around align-items-center " >
              <h2 className="fw-bold fs-3">
                {location.includes("profile") ? (
                  <UserPlaceholder
                    setUserData={setUserData}
                    userData={userData}
                  />
                ) : location.includes("explore") ? (
                  "Explore"
                ) : (
                  "Home"
                )}
              </h2>
              {/* <FontAwesomeIcon className="fa-regular" icon={faStar} /> */}
            </div>
          </div>

          <div className="col-12  col-md-3">
            <FontAwesomeIcon
               className="position-absolute m-2"
              icon={faMagnifyingGlass}
            />
            <input type="text"  className="py-2 px-4" style={{background:'#e6f2ff',borderRadius:'24px'}}/>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default Navbar;

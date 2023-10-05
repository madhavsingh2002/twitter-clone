import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from './signimg.png'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signup", {
        userName:username,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "User successfully Register",
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "check Details Again",
      });
      dispatch(loginFailed());
    }
  };

  return (
    
      <div className="d-flex flex-column flex-md-row container mx-auto"style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', borderRadius: '24px',height:'650px' }}>
        <div className="col-md-6">
          <img className="img-fluid" src={Img} alt="aboutimg" width={'100%'} style={{height:'100%',borderRadius:'12px',marginLeft:'-12px'}} />
        </div>
        <div className="col-md-6 bg-white p-4 rounded">
          <h1 className="h2 font-weight-bold mb-4">Signup</h1>
          <p className="mb-4">
            Create an account to get started. Unlock amazing features and stay connected with us.
          </p>
          <div className="card mb-3 p-3">
            <div className="card-body">
              <form>
              <div className="mb-4">
                  <label htmlFor="floatingInput" className="form-label mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="floatingInput" className="form-label mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit"  onClick={handleSignup} style={{ borderRadius:'12px',padding:'12px 24px',background:'black',color:'white'}}>
                  Signup
                </button>
                <hr className="my-2" />
                <span>Already have an account?</span>{" "}
                <Link to="/signin" className="text-pink-500">
                  Login
                </Link>
                <hr className="my-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Signup;

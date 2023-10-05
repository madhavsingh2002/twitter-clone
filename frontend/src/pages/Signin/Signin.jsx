import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Img from './signimg.png'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Swal from "sweetalert2";
function Signin() {
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('/auth/signin', { userName: username, password })
      Swal.fire({
        icon: "success",
        title: "User successfully Login",
      });
      dispatch(loginSuccess(res.data));
      
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "check credentials",
      });
      dispatch(loginFailed());
    }
  };
  
  return (
    
      <div className="d-flex flex-column flex-md-row container mx-auto"style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'24px',height:'550px'}}>
        <div className="col-md-6">
        <img className="img-fluid" src={Img} alt="aboutimg" width={'100%'} style={{height:'100%',borderRadius:'12px',marginLeft:'-12px'}} />
        </div>
        <div className="col-md-6 bg-white p-4 rounded">
          <h1 className="h2 font-weight-bold mb-4">Login</h1>
          <p className="mb-4">
            Login to access your account. Securely manage your profile and
            explore personalized features. Stay connected with us effortlessly.
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
                   
                    onChange={(e)=>setUsername(e.target.value)}
                    autoFocus
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    
                    onChange={(e)=>setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" onClick={handleLogin} style={{ borderRadius:'12px',padding:'12px 24px',background:'black',color:'white'}}>
                  Login
                </button>
                <ToastContainer />
                <hr className="my-2" />
                <span>Don't have an account to login?</span>{" "}
                <Link to="/signup" className="text-pink-500">
                  Signup
                </Link>
                <hr className="my-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Signin

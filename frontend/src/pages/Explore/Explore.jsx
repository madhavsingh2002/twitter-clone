import React from 'react'
import Sidebarleft from '../../components/Navbar/Sidebar/Sidebarleft'
import MainTweet from '../../components/Main/MainTweet'
import Sidebarright from '../../components/Navbar/Sidebar/Sidebarright'
import ExploreTweets from '../../components/ExploreTweets/ExploreTweets'

import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";
function Explore() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
        {!currentUser ? (
        <Signin />
      ) : (
      <div className="row">
          <div className="col-md-3">
            <Sidebarleft />
          </div>
          <div className="col-6 px-6" style={{borderRight:'1px solid #D3D3D3',borderLeft:'1px solid #D3D3D3'}}>
            <ExploreTweets/>

          </div>
          <div className="col-md-3">
           <Sidebarright/>
          </div>
        </div>
     )}
    </>
  )
}

export default Explore

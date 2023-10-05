import React from 'react'
import { Link } from "react-router-dom";
function PageNot() {
  return (
    <div className="text-center my-4">
      <h2 className="h2 fw-bold">Error, page not found</h2>
      <p className="pb-2">
        Please go back to login <br />
      </p>

      <Link
        to="/signin"
        className="bg-primary py-1 px-3  text-white" style={{borderRadius:'20px'}}
      >
        Login
      </Link>
    </div>
  )
}

export default PageNot

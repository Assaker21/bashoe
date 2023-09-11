import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./finish.page.scss";

const Finish = () => {
  return (
    <>
      <div className="finish">
        <span className="finish-message">
          Your order has been sent! <br />
          <Link to="/" className="finish-link">
            Want to check what else we have?
          </Link>
        </span>
      </div>
    </>
  );
};

export default Finish;

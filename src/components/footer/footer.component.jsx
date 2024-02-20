import React from "react";
import "./footer.component.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-info">
          <span className="footer-title">Have any questions? Contact us</span>
          <div className="contact-methods">
            <span>Email: hoophouse24@outlook.com</span>
          </div>
        </div>
        <div className="footer-foot">
          Created by
          <a
            rel="noreferrer"
            target="_blank"
            href="https://charbelassaker.onrender.com"
          >
            Charbel Assaker
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;

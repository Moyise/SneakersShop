import React from "react";
import "./footer.css";

const time = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="footerRow">
          <div className="socials">
            <a href="https://twitter.com/0moyise" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/moyise-kane-a64a45117"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <h4>&copy; Sneakers {time}</h4>
        </div>
      </div>
    </>
  );
};

export default Footer;

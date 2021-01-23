import React from "react";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./about.css";

const AboutScreen = () => {
  return (
    <>
      <div className="aboutContainer">
        <Link to="/">
          <KeyboardReturnIcon className="icon" />
        </Link>
        <div className="aboutMe">
          <h1>Hi. I'm Moyise.</h1>
          <p>I’m a front-end developer.</p>
          <p>I made this web app with:</p>
          <p>
            <strong>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noreferrer"
                className="react"
              >
                React
              </a>
            </strong>
            ,{" "}
            <strong>
              <a
                href="https://redux.js.org/"
                target="_blank"
                rel="noreferrer"
                className="redux"
              >
                Redux
              </a>
            </strong>
            ,{" "}
            <strong>
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                rel="noreferrer"
                className="mongo"
              >
                MongoDB
              </a>
            </strong>
            ,
            <strong>
              <a
                href="https://expressjs.com/"
                target="_blank"
                rel="noreferrer"
                className="express"
              >
                Express
              </a>
            </strong>
            ,{" "}
            <strong>
              <a
                href="https://nodejs.org/en/"
                target="_blank"
                rel="noreferrer"
                className="nodejs"
              >
                Nodejs
              </a>
            </strong>
            .
          </p>
          <br />
          <h4>I occasionally take on freelance opportunities.</h4>
          <p>Contact me:</p>
          <br />
          <h4>
            EMAIL:{" "}
            <a className="email" href="mailto:moyisemr@gmail.com">
              moyisemr@gmail.com
            </a>
          </h4>
          <h5>Mobile: +1 437 775 8373</h5>
        </div>
      </div>
    </>
  );
};

export default AboutScreen;

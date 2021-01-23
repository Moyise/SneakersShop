import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="loaderWrap">
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default Loader;

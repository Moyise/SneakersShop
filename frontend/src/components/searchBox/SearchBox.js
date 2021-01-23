import React, { useState } from "react";
import "./searchBox.css";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="sbForm">
      <div className="sbFormGroup">
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="sbFormInput"
          autoComplete="off"
        />
      </div>

      <button type="submit" className="sbButton">
        Search
      </button>
    </form>
  );
};

export default SearchBox;

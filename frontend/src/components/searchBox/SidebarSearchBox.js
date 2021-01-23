import React, { useState } from "react";
import "./sidebarSearch.css";

const SidebarSearchBox = ({ history, toggle }) => {
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
    <form onSubmit={submitHandler} className="sbFormSide">
      <div className="sbFormGroupSide">
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="sbFormInputSide"
          autoComplete="off"
        />
      </div>

      <button type="submit" className="sbButtonSide">
        Search
      </button>
    </form>
  );
};

export default SidebarSearchBox;

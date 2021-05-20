import React from "react";

const SearchBar = (props) => {
  const { value } = props;

  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    >
    </input>
  );
};

export default SearchBar;

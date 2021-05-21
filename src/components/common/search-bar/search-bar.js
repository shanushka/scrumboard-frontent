import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = (props) => {
  const { value, onChange, placeholder = "Search" } = props;

  return (
    <div className="search__wrapper">
      <MdSearch />
      <input
        onChange={(event) => onChange(event.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

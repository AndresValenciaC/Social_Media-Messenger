import React from "react";
import "./searchBar.css";
import { Search } from "@material-ui/icons";
export default function SearchBar() {
  return (
    <div className="searchBar">
      <Search className="searchIcon" />
      <input type="text" placeholder="search" className="searchInput" />
    </div>
  );
}

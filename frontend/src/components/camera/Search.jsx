import React, { useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import "../../css/camera/camera.css";
import { TextField } from "@mui/material";
import SearchListCard from "./SearchListCard";

const Search = ({ handleModal }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="searchContainer">
      <TextField
        id="standard-search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        label={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <SearchSharpIcon />
            <span className="space">Search</span>
          </div>
        }
        type="search"
        variant="filled"
        color="primary"
        className="text"
      />
      {searchText && (
        <div>
          {/* UserListCard will come under map */}
          <SearchListCard handleModal={handleModal} />
          <SearchListCard handleModal={handleModal} />
        </div>
      )}
    </div>
  );
};

export default Search;

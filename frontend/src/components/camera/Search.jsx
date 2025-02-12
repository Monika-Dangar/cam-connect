import React, { useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import "../../css/camera/camera.css";
import { TextField } from "@mui/material";
import SearchListCard from "./SearchListCard";
import cameraServies from "../../services/cameraServices";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchUserData, setSearchUserData] = useState({});

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    const response = await cameraServies.searchUser(searchText);
    console.log(response);
    if (response) {
      setSearchUserData(response.response);
    }
    console.log(searchUserData[0]);
  };
  return (
    <div className="searchContainer">
      <TextField
        id="standard-search"
        value={searchText}
        onChange={handleSearch}
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
          {/* Map as many times of data length and send user data and device data to modal */}
          {Object.keys(searchUserData).length > 0 &&
            searchUserData.map((searchData) => {
              return (
                <SearchListCard
                  searchUserData={searchData}
                  key={searchData.user._id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;

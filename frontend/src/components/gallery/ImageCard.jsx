import React, { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';

const ImageCard = () => {
  const [isFav, setIsFav] = useState(true);

  const handleAddOrRemoveFav = () => {
    setIsFav((prev) => !prev);
    // console.log(`Fav: ${isFav}`);
  };

  return (
    <>
      <div className="mb-4 bg-slate-50">
        <img
          className="w-74 h-64"
          src="https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?t=st=1739535314~exp=1739538914~hmac=4aa7aec14afd468fb3cefc9d31461acd1e887f8a4d776fc28611d6b9b54417d4&w=740"
        />
        <div className="flex mt-4 mb-2 justify-between ml-2 mr-2">
          <div className="bg-slate-200 rounded-full">
            <AddIcon />
            <input
              type="text"
              name=""
              id=""
              placeholder="add tag here..."
              className="pl-2 rounded-full bg-slate-200 w-48"
            />
          </div>
          <button onClick={handleAddOrRemoveFav}>
            {isFav ? (
              <BookmarkBorderIcon className="text-slate-500" />
            ) : (
              <BookmarkIcon className="text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCard;

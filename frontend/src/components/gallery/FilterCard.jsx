import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const FilterCard = () => {
  return (
    <>
      <div className="bg-white w-1/5 h-36">
        <div className="ml-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className="ml-2">
            Favourites
          </label>
        </div>
        <div className="ml-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className="ml-2">
            Device
          </label>
        </div>
        <div className="ml-2">
          <input type="date" name="" id="" />
        </div>
        <div className="ml-2">
          <input type="text" name="" id="" />
          <label htmlFor="" className="ml-2">
            Tags
          </label>
        </div>
        <div className="ml-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className="ml-2">
            Location
          </label>
        </div>
      </div>
    </>
  );
};

export default FilterCard;

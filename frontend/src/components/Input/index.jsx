import React from "react";
import PropTypes from "prop-types";
const Input = ({
  name = "", //passed to uniquely identify input field and for labels
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => null,
  isRequired = true,
  className = "",
  classInput = "",
}) => {
  return (
    <div
      className={`flex flex-col lg:justify-center items-center justify-evenly   hover:border-black lg:h-[20%] h-[21%] ${className}`}
    >
      <input
        className={`bg-gray2  w-[80%] h-[75%] rounded-md px-4 focus:outline-none border-2 border-spacing-0 hover:border-black ${classInput} `}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
      ></input>
    </div>
  );
};
Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  classInput: PropTypes.string,
};
export default Input;

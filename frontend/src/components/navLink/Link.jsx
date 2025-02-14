import "../../css/sidebar/sidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Link = ({ icon: Icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "linkContainer active" : "linkContainer"
      }
    >
      <div className="linkContainer">
        <Icon className="likeIcon" />
        <p className="linkText">{text}</p>
      </div>
    </NavLink>
  );
};

export default Link;

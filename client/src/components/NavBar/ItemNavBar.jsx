import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const ItemNavBar = ({ item }) => {
  return (
    <NavLink to={item.path} className={style.itemNav}>
      {item.name}
    </NavLink>
  );
};

export default ItemNavBar;

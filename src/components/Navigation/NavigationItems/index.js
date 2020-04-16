import React from "react";

import classes from "./style.css";
import NavigationItem from "./NavigationItem";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/images/user-icon.svg";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <li className={classes.Profile}>
      <div style={{ textAlign: "center", minWidth: "35px" }}>
        <img width="20px" src={userIcon} alt="User" />
      </div>
      <div className={classes.DropDownOptions}>
        <Link to="/">Profile</Link>
        <Link to="/auth">Log in</Link>
        <Link to="/">My Orders</Link>
        <Link to="/">Log Out</Link>
      </div>
    </li>
  </ul>
);

export default navigationItems;

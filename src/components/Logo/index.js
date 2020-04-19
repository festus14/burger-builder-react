import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./style.css";

const logo = (props) => (
  <div
    className={classes.Logo}
    style={{ height: props.height, width: props.width }}
  >
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;

import React from "react";

import classes from "./style.css";

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[
      classes.Button,
      classes[props.btnType],
      classes[props.hasBackground],
    ].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;

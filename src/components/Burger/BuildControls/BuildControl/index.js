import React from "react";

import classes from "./style.css";

const buildControl = props => {
  let lessAble = props.disabled;
  let moreAble = false;
  console.log(props)
  if (props.ingredients === "failed") {
    lessAble = true;
    moreAble = true;
  }
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.removed} disabled={lessAble}>
        Less
      </button>
      <button
        className={classes.More}
        onClick={props.added}
        disabled={moreAble}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;

import React from "react";

import classes from "./style.css";
import BuildControl from "./BuildControl";

const buildControls = (props) => {
  let controls = [
    { label: "salad", type: "salad" },
    { label: "bacon", type: "bacon" },
    { label: "cheese", type: "cheese" },
    { label: "meat", type: "meat" },
  ];

  const sum = Object.keys(props.ingredients)
    .map((igKey) => {
      return props.ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
  let able = sum > 0;

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          ingredients={props.ingredients}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!able}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

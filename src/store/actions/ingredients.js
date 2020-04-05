import { SET_INGREDIENT } from "./actionTypes";

export const setIngredients = (ingredientName, val) => {
  return {
    type: SET_INGREDIENT,
    ingredientName,
    val
  };
};

export const addIngredients = ingName => dispatch => {
    dispatch(setIngredients(ingName, +1))
};

export const removeIngredients = ingName => dispatch => {
    dispatch(setIngredients(ingName, -1))
};

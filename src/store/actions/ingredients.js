import { SET_INGREDIENT, SET_ALL_INGREDIENTS } from "./actionTypes";
import fAxios from "../../util/axios-orders";
import { ingredientsUiStartLoading, ingredientsUiStopLoading } from ".";

export const setIngredients = (ingredientName, val) => {
  return {
    type: SET_INGREDIENT,
    ingredientName,
    val
  };
};

export const setAllIngredients = ingredients => {
  return {
    type: SET_ALL_INGREDIENTS,
    ingredients
  };
};

export const getIngredients = () => async dispatch => {
  dispatch(ingredientsUiStartLoading());
  try {
    let ingredients = await fAxios.get("/ingredients.json");
    dispatch(ingredientsUiStopLoading());
    if (ingredients.statusText === "OK") {
      dispatch(setAllIngredients(ingredients.data));
      return null;
    }
    return ingredients.statusText;
  } catch (error) {
    dispatch(ingredientsUiStopLoading());
    return error.message;
  }
};

export const addIngredients = ingName => dispatch => {
  dispatch(setIngredients(ingName, +1));
};

export const removeIngredients = ingName => dispatch => {
  dispatch(setIngredients(ingName, -1));
};

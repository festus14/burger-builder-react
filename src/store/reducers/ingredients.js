import { SET_INGREDIENT, SET_ALL_INGREDIENTS } from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export default (state = initialState, action) => {
  const { type, ingredientName, val, ingredients } = { ...action };
  switch (type) {
    case SET_ALL_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: ingredients.salad,
          bacon: ingredients.bacon,
          cheese: ingredients.cheese,
          meat: ingredients.meat,
        },
        totalPrice: 4,
      };

    case SET_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + val,
        },
      };

    default:
      return state;
  }
};

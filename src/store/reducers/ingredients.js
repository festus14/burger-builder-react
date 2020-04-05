import { SET_INGREDIENT } from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default (state = initialState, action) => {
  const { type, ingredientName, val } = { ...action };
  switch (type) {
    case SET_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + val
        }
      };

    default:
      return state;
  }
};

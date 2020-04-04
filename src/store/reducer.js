import * as actionTypes from "./actions";

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

const reducer = (state = initialState, action) => {
  const { type, ingredientName } = { ...action };
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] + 1
        }
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
        ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] - 1
        }
      };

    default:
      return state;
  }
};

export default reducer;

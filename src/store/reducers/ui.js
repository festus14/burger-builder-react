import {
  INGREDIENTS_UI_START_LOADING,
  INGREDIENTS_UI_STOP_LOADING,
  ORDERS_UI_START_LOADING,
  ORDERS_UI_STOP_LOADING
} from "../actions/actionTypes";

const initialState = {
  isIngredientsLoading: false,
  isOrderLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_UI_START_LOADING:
      return {
        ...state,
        isIngredientsLoading: true,
      };
    case INGREDIENTS_UI_STOP_LOADING:
      return {
        ...state,
        isIngredientsLoading: false
      };
      case ORDERS_UI_START_LOADING:
        return {
          ...state,
          isOrderLoading: true,
        };
      case ORDERS_UI_STOP_LOADING:
        return {
          ...state,
          isOrderLoading: false
        };
    default:
      return state;
  }
};

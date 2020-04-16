import {
  INGREDIENTS_UI_START_LOADING,
  INGREDIENTS_UI_STOP_LOADING,
  ORDERS_UI_START_LOADING,
  ORDERS_UI_STOP_LOADING,
  USER_UI_START_LOADING,
  USER_UI_STOP_LOADING,
} from "../actions/actionTypes";

export const ingredientsUiStartLoading = () => ({
  type: INGREDIENTS_UI_START_LOADING,
});

export const ingredientsUiStopLoading = () => ({
  type: INGREDIENTS_UI_STOP_LOADING,
});

export const ordersUiStartLoading = () => ({
  type: ORDERS_UI_START_LOADING,
});

export const ordersUiStopLoading = () => ({
  type: ORDERS_UI_STOP_LOADING,
});

export const userUiStartLoading = () => ({
  type: USER_UI_START_LOADING,
});

export const userUiStopLoading = () => ({
  type: USER_UI_STOP_LOADING,
});

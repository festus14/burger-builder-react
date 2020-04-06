export {
  ingredientsUiStartLoading,
  ingredientsUiStopLoading,
  ordersUiStartLoading,
  ordersUiStopLoading
} from "./ui";

export {
  getIngredients,
  addIngredients,
  removeIngredients
} from "./ingredients";

export { getOrders } from "./orders";

export const resetApp = () => {
  return async dispatch => {
    dispatch(reset());
  };
};

const reset = () => ({
  type: "RESET_APP"
});

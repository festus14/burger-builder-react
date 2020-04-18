import { removeAuthenticatedState } from "../../services/Auth";

export {
  ingredientsUiStartLoading,
  ingredientsUiStopLoading,
  ordersUiStartLoading,
  ordersUiStopLoading,
} from "./ui";

export {
  getIngredients,
  addIngredients,
  removeIngredients,
} from "./ingredients";

export { getOrders, addOrder } from "./orders";

export {
  signUp,
  logIn,
  logOut,
  forgotPassword,
  checkAuthState,
  refreshToken,
  setToken,
} from "./auth";

export { getUser, postUser } from "./user";

export const resetApp = () => {
  return async (dispatch) => {
    removeAuthenticatedState();
    dispatch(reset());
  };
};

const reset = () => ({
  type: "RESET_APP",
});

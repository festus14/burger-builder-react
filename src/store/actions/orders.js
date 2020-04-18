import { SET_ORDERS } from "./actionTypes";
import fAxios from "../../util/axios-orders";
import { ordersUiStartLoading, ordersUiStopLoading } from ".";

export const setOrders = (fetchedOrders) => {
  return {
    type: SET_ORDERS,
    orders: fetchedOrders,
  };
};

export const getOrders = (token, userId) => async (dispatch) => {
  try {
    dispatch(ordersUiStartLoading());
    let allOrders = await fAxios.get(
      `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    );
    dispatch(ordersUiStopLoading());
    if (allOrders.statusText === "OK") {
      const fetchedOrders = [];
      for (let key in allOrders.data) {
        fetchedOrders.push({
          ...allOrders.data[key],
          id: key,
        });
      }
      dispatch(setOrders(fetchedOrders));
      return null;
    }
    return allOrders.statusText;
  } catch (error) {
    dispatch(ordersUiStopLoading());
    return error.message;
  }
};
export const addOrder = (order, token) => async (dispatch) => {
  try {
    dispatch(ordersUiStartLoading());
    let addOrder = await fAxios.post(`/orders.json?auth=${token}`, order);
    dispatch(ordersUiStopLoading());
    if (addOrder.statusText === "OK") {
      await dispatch(getOrders(token));
      return null;
    }
    return addOrder.statusText;
  } catch (error) {
    dispatch(ordersUiStopLoading());
    return error.message;
  }
};

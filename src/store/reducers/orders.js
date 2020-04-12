import { SET_ORDERS } from "../actions/actionTypes";

const initialState = {
  orders: [],
};

export default (state = initialState, { type, orders }) => {
  switch (type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: orders,
      };

    default:
      return state;
  }
};

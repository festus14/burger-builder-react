import { SET_TOKEN } from "../actions/actionTypes";

const initialState = {
  token: null,
  refreshToken: null,
  expiresIn: null,
};

export default (state = initialState, action) => {
  const { type, token, refreshToken, expiresIn } = action;
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        token: token,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      };

    default:
      return state;
  }
};

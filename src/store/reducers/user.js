import { SET_USER } from "../actions/actionTypes";

const initialState = {
  userId: null,
  username: null,
  displayName: null,
  email: null,
  zipCode: null,
  address: null,
  country: null,
};

export default (state = initialState, action) => {
  const {
    type,
    userId,
    username,
    displayName,
    email,
    zipCode,
    address,
    country,
  } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        userId: userId,
        username: username,
        displayName: displayName,
        email: email,
        zipCode: zipCode,
        address: address,
        country: country,
      };

    default:
      return state;
  }
};

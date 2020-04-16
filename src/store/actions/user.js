import { SET_USER } from "./actionTypes";
import { userUiStartLoading, userUiStopLoading } from "./ui";

import fAxios from "../../util/axios-orders";

export const setUser = (payload) => ({
  type: SET_USER,
  userId: payload.localId,
  username: payload.username,
  displayName: payload.displayName,
  email: payload.email,
  zipCode: payload.zipCode,
  address: payload.address,
  country: payload.country,
});

export const getUser = (payload) => async (dispatch) => {
  dispatch(userUiStartLoading());
  try {
    let userObject = await fAxios.get("/profile.json", payload.localId);
    console.log(userObject.data);
    // const { idToken, email, refreshToken, expiresIn, localId, username } = payloadSignUp;
    // const {localId, email, displayName, idToken, registered, refreshToken, expiresIn} = payloadSignIn;
    // const { username, displayName, address,  zipCode, country } = userObject.data;
    dispatch(userUiStopLoading());
    if (userObject.statusText === "OK") {
      dispatch(setUser({ ...payload, ...userObject.data }));
      return null;
    }
    return userObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    console.log(error.message);
    return error.message;
  }
};

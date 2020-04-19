import { SET_USER } from "./actionTypes";
import { userUiStartLoading, userUiStopLoading } from "./ui";

import axios from "axios";
import { API_GET_USER, API_POST_USER } from "../../util/constants";

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
    let userObject = await axios.post(API_GET_USER, {
      idToken: payload.idToken,
    });
    // const { idToken, email, refreshToken, expiresIn, localId, username } = payloadSignUp;
    // const {localId, email, displayName, idToken, registered, refreshToken, expiresIn} = payloadSignIn;
    // You get an array containing: localId, email, displayName, and so on = userObject.data;
    dispatch(userUiStopLoading());
    if (userObject.status === 200) {
      dispatch(setUser({ ...payload, ...userObject.data.users[0] }));
      return null;
    }
    return userObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    return error.message;
  }
};

export const postUser = (payload) => async (dispatch) => {
  dispatch(userUiStartLoading());
  try {
    let postObject = await axios.post(API_POST_USER, {
      idToken: payload.idToken,
      displayName: payload.displayName,
      deleteAttribute: ["PHOTO_URL"],
      returnSecureToken: false,
    });
    dispatch(userUiStopLoading());
    if (postObject.status === 200) {
      dispatch(setUser(postObject.data));
      return null;
    }
    return postObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    return error.message;
  }
};

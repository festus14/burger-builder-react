import { SET_TOKEN } from "./actionTypes";
import { authenticateUser } from "../../services/Auth";
import { userUiStartLoading, userUiStopLoading } from "./ui";

import axios from "axios";
import { getUser } from "./user";
import { API_SIGN_UP, API_SIGN_IN } from "../../util/constants";
import { resetApp } from ".";

export const setToken = ({ idToken, refreshToken, expiresIn }) => {
  authenticateUser(idToken, refreshToken, expiresIn);
  return {
    type: SET_TOKEN,
    token: idToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn,
  };
};

export const signUp = (email, password, username) => async (dispatch) => {
  dispatch(userUiStartLoading());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  try {
    let tokenObject = await axios.post(API_SIGN_UP, authData);
    // const { idToken, email, refreshToken, expiresIn, localId } = tokenObject.data;
    dispatch(userUiStopLoading());
    if (tokenObject.status === 200) {
      await dispatch(setToken(tokenObject.data));
      await dispatch(getUser({ ...tokenObject.data, username }));
      return null;
    }
    return tokenObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    return error.message;
  }
};

export const logIn = (email, password) => async (dispatch) => {
  dispatch(userUiStartLoading());
  try {
    let tokenObject = await axios.post(API_SIGN_IN, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(tokenObject.data);
    // const {localId, email, displayName, idToken, registered, refreshToken, expiresIn} = tokenObject.data;
    dispatch(userUiStopLoading());
    if (tokenObject.status === 200) {
      await dispatch(setToken(tokenObject.data));
      await dispatch(getUser(tokenObject.data));
      return null;
    }
    return tokenObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    console.log(error.message);
    return error.message;
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch(userUiStartLoading());
    dispatch(resetApp());
    dispatch(userUiStopLoading());
    return null;
  } catch (error) {
    console.log(error);
    return "Something went wrong. Check your internet";
  }
};

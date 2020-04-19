import { SET_TOKEN } from "./actionTypes";
import { authenticateUser } from "../../services/Auth";
import { userUiStartLoading, userUiStopLoading } from "./ui";

import axios from "axios";
import { getUser, postUser } from "./user";
import {
  API_SIGN_UP,
  API_SIGN_IN,
  API_REFRESH_TOKEN,
} from "../../util/constants";
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
      const expiredTime =
        new Date().getTime() + (+tokenObject.data.expiresIn - 60) * 1000;
      await dispatch(setToken({ ...tokenObject.data, expiresIn: expiredTime }));
      await dispatch(postUser({ ...tokenObject.data, displayName: username }));
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
    // const {localId, email, displayName, idToken, registered, refreshToken, expiresIn} = tokenObject.data;
    dispatch(userUiStopLoading());
    if (tokenObject.status === 200) {
      const expiredTime =
        new Date().getTime() + (+tokenObject.data.expiresIn - 60) * 1000;
      await dispatch(setToken({ ...tokenObject.data, expiresIn: expiredTime }));
      await dispatch(postUser({ ...tokenObject.data }));
      await dispatch(getUser(tokenObject.data));
      return null;
    }
    return tokenObject.statusText;
  } catch (error) {
    dispatch(userUiStopLoading());
    return error.message;
  }
};

export const checkAuthState = (token, refresh, expired) => async (dispatch) => {
  const currentTime = new Date().getTime();
  if (token) {
    if (expired >= currentTime) {
      await dispatch(getUser({ idToken: token }));
      return "Token hasn't expired: GO TO HOMEPAGE";
    } else {
      const newToken = await dispatch(refreshToken(refresh));
      await dispatch(getUser({ idToken: newToken }));
      return "Token expired but has been renewed: GO TO HOMEPAGE";
    }
  } else {
    return "Token does not exist: GO TO AUTH_PAGE";
  }
};

export const refreshToken = (refresh) => async (dispatch) => {
  dispatch(userUiStartLoading());
  try {
    const refreshData = {
      grant_type: "refresh_token",
      refresh_token: refresh,
    };
    const refreshObject = await axios.post(API_REFRESH_TOKEN, refreshData);
    dispatch(userUiStopLoading());
    if (refreshObject.status === 200) {
      const { id_token, refresh_token, expires_in } = refreshObject.data;
      const expiredTime = new Date().getTime() + (+expires_in - 60) * 1000;
      const tokenObject = {
        idToken: id_token,
        refreshToken: refresh_token,
        expiresIn: expiredTime,
      };
      await dispatch(setToken(tokenObject));
      return id_token;
    }
    return null;
  } catch (error) {
    dispatch(userUiStopLoading());
    return null;
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch(userUiStartLoading());
    dispatch(resetApp());
    dispatch(userUiStopLoading());
    return null;
  } catch (error) {
    return error.message || "Something went wrong. Check your internet";
  }
};

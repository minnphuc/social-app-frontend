import { authActions } from "./auth-state";
import { modalActions } from "../Modal/modal-state";
import { spinnerActions } from "../Spinner/spinner-state";

import { LOGIN_SERVICE, SIGNUP_SERVICE } from "../../service";
import { JWT_EXPIRES_IN } from "../../config";

let logoutTimerId;

//? ----HELPER FUNCTION----

const calcRemainingTime = expiredTime => {
  const currentTime = new Date().getTime();
  const expirationTime = new Date(expiredTime).getTime();

  const remainingTime = expirationTime - currentTime;

  return remainingTime;
};

const getStoredToken = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expiredTime = localStorage.getItem("expiredTime");

  const remainingTime = calcRemainingTime(expiredTime);

  // Less than 1 minute
  if (remainingTime < 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiredTime");
    return null;
  }

  return {
    token: token,
    userId: userId,
    remainingTime: remainingTime,
  };
};

const login = (dispatch, token, id) => {
  // Login
  dispatch(authActions.login({ token: token, userId: id }));

  // Set timer for expired token
  const expiredTime = new Date(Date.now() + JWT_EXPIRES_IN);
  const remainingTime = calcRemainingTime(expiredTime);
  logoutTimerId = setTimeout(() => {
    dispatch(logoutRequest());
  }, remainingTime);

  // Store auth info
  localStorage.setItem("token", token);
  localStorage.setItem("userId", id);
  localStorage.setItem("expiredTime", expiredTime);
};

//? ----THUNK----

export const logoutRequest = function () {
  return dispatch => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiredTime");
    clearTimeout(logoutTimerId);
  };
};

export const loginRequest = function (email, password) {
  return async dispatch => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(LOGIN_SERVICE, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      const { token, user } = data;

      login(dispatch, token, user._id);
    } catch (error) {
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }

    dispatch(spinnerActions.close());
  };
};

export const signupRequest = function (newUser) {
  return async dispatch => {
    dispatch(spinnerActions.open());

    try {
      const res = await fetch(SIGNUP_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          passwordConfirm: newUser.passwordConfirm,
          name: newUser.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      const { token, user } = data;

      login(dispatch, token, user._id);

      dispatch(
        modalActions.open({
          content: "Your account has been registered successfully",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(modalActions.open({ content: error.message, type: "error" }));
    }

    dispatch(spinnerActions.close());
  };
};

export const loginWithStoredToken = function () {
  return dispatch => {
    const storedAuthInfo = getStoredToken();
    if (storedAuthInfo === null) return;
    const { token, userId, remainingTime } = storedAuthInfo;

    dispatch(authActions.login({ token: token, userId: userId }));
    console.log(`Token expired in: ${remainingTime / 1000 / 60} minutes`);
    // setTimeout with negative delay will auto use the minimum value (zero)
    logoutTimerId = setTimeout(() => {
      dispatch(logoutRequest());
    }, remainingTime);
  };
};

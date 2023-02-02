import { authActions } from "./auth-state";
import { modalActions } from "../Modal/modal-state";
import { LOGIN_SERVICE, SIGNUP_SERVICE } from "../../service";

let logoutTimerId;

// ----HELPER FUNCTION----

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

// ----THUNK----

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
    try {
      dispatch(authActions.sendingRequest());
      const res = await fetch(LOGIN_SERVICE, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      const { token, id, expiresIn } = data;
      // Login
      dispatch(authActions.login({ token: token, userId: id }));

      // Set timer for expired token
      const expiredTime = new Date(new Date().getTime() + +expiresIn);
      const remainingTime = calcRemainingTime(expiredTime);
      logoutTimerId = setTimeout(() => {
        dispatch(logoutRequest());
      }, remainingTime);

      // Store auth info
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("expiredTime", expiredTime);
    } catch (err) {
      dispatch(authActions.errorRequest(err.message));
      dispatch(modalActions.openModal({ content: err.message, type: "error" }));
    }
  };
};

export const signupRequest = function (newUser, navigateToLogin) {
  return async dispatch => {
    try {
      dispatch(authActions.sendingRequest());

      const res = await fetch(SIGNUP_SERVICE, {
        method: "POST",
        body: JSON.stringify({ email: newUser.email, password: newUser.password, name: newUser.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(res);
      if (!res.ok) throw new Error(data.message);

      dispatch(authActions.resolveRequest());

      dispatch(modalActions.openModal({ content: "Your account has been registered successfully", type: "success" }));
      navigateToLogin();
    } catch (err) {
      dispatch(authActions.errorRequest(err.message));
      dispatch(modalActions.openModal({ content: err.message, type: "error" }));
    }
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

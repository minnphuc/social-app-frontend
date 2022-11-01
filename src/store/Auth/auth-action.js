import { authActions } from "./auth-state";
import { FIREBASE_DATABASE, FIREBASE_LOGIN, FIREBASE_SIGNUP } from "../../service";
import { modalActions } from "../Modal/modal-state";

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
      const res = await fetch(FIREBASE_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password, returnSecureToken: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error.message);

      const { idToken, localId, expiresIn } = data;
      // Login
      dispatch(authActions.login({ token: idToken, userId: localId }));

      // Set timer for expired token
      const expiredTime = new Date(new Date().getTime() + +expiresIn * 1000);
      const remainingTime = calcRemainingTime(expiredTime);
      logoutTimerId = setTimeout(() => {
        dispatch(logoutRequest());
      }, remainingTime);

      // Store auth info
      localStorage.setItem("token", idToken);
      localStorage.setItem("userId", localId);
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

      const res = await fetch(FIREBASE_SIGNUP, {
        method: "POST",
        body: JSON.stringify({ email: newUser.email, password: newUser.password, returnSecureToken: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error.message);

      const resDb = await fetch(`${FIREBASE_DATABASE}/users/${data.localId}.json`, {
        method: "PUT",
        body: JSON.stringify({ name: newUser.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataDb = await resDb.json();
      if (!resDb.ok) throw new Error(dataDb.message);

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
    logoutTimerId = setTimeout(() => {
      dispatch(logoutRequest());
    }, remainingTime);
  };
};

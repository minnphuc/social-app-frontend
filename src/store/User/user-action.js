import { GET_USER_BY_ID_SERVICE, GET_ALL_USER_SERVICE } from "../../service";
import { userActions } from "./user-state";

export const getCurrentUser = function (userId) {
  return async dispatch => {
    try {
      const res = await fetch(GET_USER_BY_ID_SERVICE(userId));
      const data = await res.json();

      if (data === null) throw new Error("Error: User does not exist!");

      dispatch(userActions.loadCurrentUser(data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getOtherUser = function (userId) {
  return async dispatch => {
    try {
      const res = await fetch(GET_USER_BY_ID_SERVICE(userId));
      const data = await res.json();

      if (data === null) throw new Error("Error: User does not exist!");

      dispatch(userActions.loadOtherUser(data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getAllUser = function () {
  return async dispatch => {
    try {
      const res = await fetch(GET_ALL_USER_SERVICE);
      const data = await res.json();

      if (data === null) throw new Error("Error: Cannot get user list!");

      dispatch(userActions.loadUserList(data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

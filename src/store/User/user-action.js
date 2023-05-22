import { GET_USER_BY_ID_SERVICE } from "../../service";
import { userActions } from "./user-state";

export const getGlobalUser = function () {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();

      const res = await fetch(GET_USER_BY_ID_SERVICE(auth.userId));
      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(userActions.loadUserData(data.user));
    } catch (error) {
      console.error(error.message);
    }
  };
};

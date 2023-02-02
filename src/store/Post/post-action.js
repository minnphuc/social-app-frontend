import { GET_ALL_POST_SERVICE } from "../../service";
import { postActions } from "./post-state";

export const getAllPost = function () {
  return async dispatch => {
    try {
      const res = await fetch(GET_ALL_POST_SERVICE);
      const data = await res.json();

      if (data === null) throw new Error("Error: Cannot get post list!");

      dispatch(postActions.loadPostList(data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

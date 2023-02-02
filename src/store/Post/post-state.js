import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const postState = createSlice({
  name: "post",
  initialState: INITIAL_STATE.post,
  reducers: {
    loadPostList(state, action) {
      const postList = action.payload;

      state.postList = postList;
    },

    addPost(state, action) {
      const newPost = action.payload;

      state.postList.push(newPost);
    },
  },
});

export const postActions = postState.actions;

export default postState.reducer;

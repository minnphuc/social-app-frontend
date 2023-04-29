import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const userState = createSlice({
  name: "user",
  initialState: INITIAL_STATE.userGlobalData,
  reducers: {
    loadUserData(state, action) {
      const userData = action.payload;

      state.id = userData._id;
      state.name = userData.name;
      state.photo = userData.photoUrl || userData.photo;
    },

    loadUserList(state, action) {
      const userList = action.payload;

      state.userList = userList;
    },
  },
});

export const userActions = userState.actions;

export default userState.reducer;

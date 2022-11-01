import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const authState = createSlice({
  name: "auth",
  initialState: INITIAL_STATE.auth,
  reducers: {
    login(state, action) {
      const { payload } = action;
      const { token, userId } = payload;

      state.token = token;
      state.userId = userId;
      state.isLogin = !!token;
      state.isLoading = false;
    },

    logout(state) {
      state.token = null;
      state.userId = null;
      state.isLogin = false;
    },

    sendingRequest(state) {
      state.isLoading = true;
    },

    resolveRequest(state) {
      state.isLoading = false;
    },

    errorRequest(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const authActions = authState.actions;

export default authState.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const modalState = createSlice({
  name: "modal",
  initialState: INITIAL_STATE.modal,
  reducers: {
    open(state, action) {
      const { payload } = action;

      state.isOpen = true;
      state.content = payload.content;
      state.type = payload.type;
    },

    close(state) {
      state.isOpen = false;
    },
  },
});

export const modalActions = modalState.actions;

export default modalState.reducer;

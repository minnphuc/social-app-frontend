import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const spinnerState = createSlice({
  name: "spinner",
  initialState: INITIAL_STATE.spinner,
  reducers: {
    open(state) {
      state.isOpen = true;
    },

    close(state) {
      state.isOpen = false;
    },
  },
});

export const spinnerActions = spinnerState.actions;

export default spinnerState.reducer;

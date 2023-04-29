import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth/auth-state";
import modalReducer from "./Modal/modal-state";
import userReducer from "./User/user-state";
import spinnerReducer from "./Spinner/spinner-state";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    user: userReducer,
    spinner: spinnerReducer,
  },
});

export default store;

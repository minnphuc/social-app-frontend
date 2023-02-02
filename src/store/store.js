import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth/auth-state";
import modalReducer from "./Modal/modal-state";
import userReducer from "./User/user-state";
import postReducer from "./Post/post-state";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    user: userReducer,
    post: postReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "../initial-state";

const userState = createSlice({
  name: "user",
  initialState: INITIAL_STATE.user,
  reducers: {
    loadCurrentUser(state, action) {
      const userData = action.payload;

      state.curUserId = userData.id;
      state.curUserName = userData.name;
      state.curUserAvatar = userData.avatar;
      state.curUserLocation = userData.location;
      state.curUserHometown = userData.hometown;
      state.curUserRelationship = userData.relationship;
      state.curUserBiography = userData.biography;
      state.curUserCoverImg = userData.coverImg;
    },

    loadOtherUser(state, action) {
      const userData = action.payload;

      state.otherUserId = userData.id;
      state.otherUserName = userData.name;
      state.otherUserAvatar = userData.avatar;
      state.otherUserLocation = userData.location;
      state.otherUserHometown = userData.hometown;
      state.otherUserRelationship = userData.relationship;
      state.otherUserBiography = userData.biography;
      state.otherUserCoverImg = userData.coverImg;
    },

    loadUserList(state, action) {
      const userList = action.payload;

      state.userList = userList;
    },
  },
});

export const userActions = userState.actions;

export default userState.reducer;

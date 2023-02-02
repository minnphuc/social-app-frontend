export const INITIAL_STATE = {
  auth: {
    token: "",
    userId: 0,
    isLogin: false,
    isLoading: false,
    error: null,
  },
  modal: {
    isOpen: false,
    content: "",
    type: "",
  },
  user: {
    curUserId: "",
    curUserName: "",
    curUserAvatar: "",
    curUserLocation: "",
    curUserHometown: "",
    curUserRelationship: 0,
    curUserBiography: "",
    curUserCoverImg: "",
    userList: [],
    otherUserId: "",
    otherUserName: "",
    otherUserAvatar: "",
    otherUserLocation: "",
    otherUserHometown: "",
    otherUserRelationship: 0,
    otherUserBiography: "",
    otherUserCoverImg: "",
  },
  post: {
    postList: [],
  },
};

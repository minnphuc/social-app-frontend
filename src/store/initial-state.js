export const INITIAL_STATE = {
  auth: {
    token: "",
    userId: 0,
    isLogin: false,
  },
  userGlobalData: {
    id: "",
    name: "",
    photo: "",
    userList: [],
  },
  modal: {
    isOpen: false,
    content: "",
    type: "",
  },
  spinner: {
    isOpen: false,
  },
};

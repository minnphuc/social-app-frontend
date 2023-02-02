// USER
export const LOGIN_SERVICE = "http://localhost:8080/user/signin";
export const SIGNUP_SERVICE = "http://localhost:8080/user/signup";
export const UPLOAD_AVATAR_SERVICE = "http://localhost:8080/user/upload";
export const GET_ALL_USER_SERVICE = "http://localhost:8080/user/getAll";

export const GET_USER_BY_ID_SERVICE = userId => {
  return `http://localhost:8080/user/${userId}`;
};

export const EDIT_USER_BY_ID_SERVICE = userId => {
  return `http://localhost:8080/user/${userId}`;
};

export const CHANGE_AVATAR_SERVICE = userId => {
  return `http://localhost:8080/user/avatar/${userId}`;
};

// POST
export const GET_ALL_POST_SERVICE = "http://localhost:8080/post/getAll";
export const UPLOAD_POST_SERVICE = "http://localhost:8080/post/upload";
export const ADD_POST_SERVICE = "http://localhost:8080/post/add";
export const LIKE_POST_SERVICE = postId => {
  return `http://localhost:8080/post/like/${postId}`;
};

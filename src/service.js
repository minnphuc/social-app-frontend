const url = "http://127.0.0.1:3000/api/v1/";

// AUTH
export const SIGNUP_SERVICE = `${url}users/signup`;
export const LOGIN_SERVICE = `${url}users/login`;

// USER
export const GET_ALL_USER_SERVICE = `${url}users`;

export const GET_USER_BY_ID_SERVICE = userId => {
  return `${url}users/${userId}`;
};

export const UPDATE_ME_SERVICE = `${url}users/updateMe`;

// POST
export const POST_SERVICE = `${url}posts`;
export const UPDATE_POST_SERVICE = postId => {
  return `${url}posts/${postId}`;
};

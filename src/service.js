import { BACKEND_URL } from "./config";

const url = `${BACKEND_URL}/api/v1/`;

// AUTH
export const SIGNUP_SERVICE = `${url}users/signup`;
export const LOGIN_SERVICE = `${url}users/login`;
export const CHANGE_PASSWORD_SERVICE = `${url}users/change-password`;

// USER
export const GET_ALL_USER_SERVICE = `${url}users`;

export const GET_FOLLOWING_USERS_SERVICE = `${url}users/following`;
export const GET_RECOMMEND_USERS_SERVICE = `${url}users/recommend`;

export const UPDATE_ME_SERVICE = `${url}users/updateMe`;

export const GET_USER_BY_NAME_SERVICE = name => `${url}users?name=${name}`;
export const GET_USER_BY_ID_SERVICE = userId => `${url}users/${userId}`;

// POST
export const CREATE_POST_SERVICE = `${url}posts`;
export const GET_POST_SERVICE = `${url}posts/following`;

export const GET_POST_BY_USER_SERVICE = userId => `${url}posts?user=${userId}`;
export const UPDATE_POST_SERVICE = postId => `${url}posts/${postId}`;

// COMMENT
export const CREATE_COMMENT_SERVICE = `${url}comments`;

export const UPDATE_COMMENT_SERVICE = commentId => `${url}comments/${commentId}`;
export const GET_COMMENTS_OF_POST = postId => `${url}comments?post=${postId}`;
export const COUNT_COMMENTS_OF_POST = postId => `${url}comments/count?post=${postId}`;

// REPLY COMMENT
export const CREATE_REPLY_SERVICE = `${url}replyComments`;

export const UPDATE_REPLY_SERVICE = replyId => `${url}replyComments/${replyId}`;

export const GET_REPLIES_OF_COMMENT = commentId =>
  `${url}replyComments?comment=${commentId}`;

export const COUNT_REPLIES_OF_COMMENT = commentId =>
  `${url}replyComments/count?comment=${commentId}`;

// CONVERSATION
export const CREATE_CONVERSATION_SERVICE = `${url}conversations`;

export const GET_MY_CONVERSATION = `${url}conversations`;

export const GET_CONVERSATION = receiverId => `${url}conversations/${receiverId}`;

// MESSAGE
export const CREATE_MESSAGE_SERVICE = `${url}messages`;

export const GET_MESSAGES_OF_CONVERSATION = conversationId =>
  `${url}messages?conversation=${conversationId}`;

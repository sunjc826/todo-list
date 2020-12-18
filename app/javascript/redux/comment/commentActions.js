import { SET_USER_DATA } from "../user/userTypes";
import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  SET_COMMENT_DATA,
} from "./commentTypes";

const fetchCommentRequest = () => ({
  type: FETCH_COMMENT_REQUEST,
});

const fetchCommentSuccess = () => ({
  type: FETCH_COMMENT_SUCCESS,
});

const fetchCommentFailure = (errMsg) => ({
  type: FETCH_COMMENT_FAILURE,
  payload: errMsg,
});

const setCommentData = (commentData) => ({
  type: SET_COMMENT_DATA,
  payload: commentData,
});

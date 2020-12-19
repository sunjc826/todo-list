import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SET_COMMENT_DATA,
} from "./commentTypes";

const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

const fetchCommentsSuccess = () => ({
  type: FETCH_COMMENTS_SUCCESS,
});

const fetchCommentsFailure = (errMsg) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: errMsg,
});

const setCommentData = (commentData) => ({
  type: SET_COMMENT_DATA,
  payload: commentData,
});

export {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  setCommentData,
};

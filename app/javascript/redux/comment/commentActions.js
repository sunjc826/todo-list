import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SET_COMMENT_DATA,
  UPDATE_COMMENT_DATA,
} from "./commentTypes";
import { updateTaskData } from "../task/taskActions";
import {
  csrfToken,
  generateDeleteRequest,
  generatePostRequest,
} from "../../helperFunctions";
import normalize from "json-api-normalizer";

const commentUrl = "/api/v1/tasks/:task_id/comments";

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

const updateCommentData = (commentData) => ({
  type: UPDATE_COMMENT_DATA,
  payload: commentData,
});

const postComment = (taskId, comment) => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/comments`;
  fetch(url, generatePostRequest(JSON.stringify({ comment })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // console.log(res.json().error); // see CommentsController for details
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      const { comment, task } = res;
      dispatch(updateCommentData(comment));
      dispatch(updateTaskData(task));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// /api/v1/tasks/:task_id/comments/:id(.:format)
const deleteComment = (taskId, commentId) => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/comments/${commentId}`;
  fetch(url, generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // console.log(res.json().error); // see CommentsController for details
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      const { comment, task } = res;
      dispatch(updateCommentData(comment));
      dispatch(updateTaskData(task));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  setCommentData,
  updateCommentData,
  postComment,
  deleteComment,
};

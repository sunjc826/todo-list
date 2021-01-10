import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SET_COMMENT_DATA,
  UPDATE_COMMENT_DATA,
  FetchCommentsRequestAction,
  FetchCommentsSuccessAction,
  FetchCommentsFailureAction,
  SetCommentDataAction,
  UpdateCommentDataAction,
} from "./commentTypes";
import { updateTaskData } from "../task/taskActions";
import {
  generateDeleteRequest,
  generatePostRequest,
} from "../../helperFunctions";
import { postActivity } from "../activity/activityActions";
import normalize from "json-api-normalizer";
import {
  AppThunk,
  CommentAttributes,
  DataRecord,
  Id,
  NormalizedData,
} from "../shared";

const commentUrl = "/api/v1/tasks/:task_id/comments";

const fetchCommentsRequest = (): FetchCommentsRequestAction => ({
  type: FETCH_COMMENTS_REQUEST,
});

const fetchCommentsSuccess = (): FetchCommentsSuccessAction => ({
  type: FETCH_COMMENTS_SUCCESS,
});

const fetchCommentsFailure = (errMsg: string): FetchCommentsFailureAction => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: errMsg,
});

const setCommentData = (
  commentData: DataRecord<CommentAttributes>
): SetCommentDataAction => ({
  type: SET_COMMENT_DATA,
  payload: commentData,
});

const updateCommentData = (
  commentData: DataRecord<CommentAttributes>
): UpdateCommentDataAction => ({
  type: UPDATE_COMMENT_DATA,
  payload: commentData,
});

interface CommentData {
  content: string;
}

const postComment = (
  taskId: Id,
  comment: CommentData
): AppThunk<Promise<any>> => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/comments`;
  return fetch(url, generatePostRequest(JSON.stringify({ comment })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(
      (res): NormalizedData => {
        return normalize(res);
      }
    )
    .then((res) => {
      const { comment, task } = res;
      dispatch(updateCommentData(comment));
      dispatch(updateTaskData(task));
      return res;
    })
    .then((res) => {
      dispatch(postActivity(taskId, { crud_type: "c", item: "comment" }));
      return res;
    });
};

// /api/v1/tasks/:task_id/comments/:id(.:format)
const deleteComment = (taskId: Id, commentId: Id): AppThunk => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/comments/${commentId}`;
  return fetch(url, generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // console.log(res.json().error); // see CommentsController for details
        throw new Error(res.statusText);
      }
    })
    .then(
      (res): NormalizedData => {
        return normalize(res);
      }
    )
    .then((res) => {
      const { comment, task } = res;
      dispatch(updateCommentData(comment));
      dispatch(updateTaskData(task));
      return res;
    })
    .then((res) => {
      dispatch(postActivity(taskId, { crud_type: "d", item: "comment" }));
      return res;
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

import normalize from "json-api-normalizer";
import {
  generateDeleteRequest,
  generatePostRequest,
} from "../../helperFunctions";

import {
  FETCH_SUBTASKS_REQUEST,
  FETCH_SUBTASKS_SUCCESS,
  FETCH_SUBTASKS_FAILURE,
  SET_SUBTASK_DATA,
  UPDATE_SUBTASK_DATA,
} from "./subtaskTypes";
import { updateTaskData } from "../task/taskActions";
import { postActivity } from "../activity/activityActions";

const fetchSubtasksRequest = () => ({
  type: FETCH_SUBTASKS_REQUEST,
});

const fetchSubtasksSuccess = () => ({
  type: FETCH_SUBTASKS_SUCCESS,
});

const fetchSubtasksFailure = (errMsg) => ({
  type: FETCH_SUBTASKS_FAILURE,
  payload: errMsg,
});

const setSubtaskData = (subtaskData) => ({
  type: SET_SUBTASK_DATA,
  payload: subtaskData,
});

const updateSubtaskData = (subtaskData) => ({
  type: UPDATE_SUBTASK_DATA,
  payload: subtaskData,
});

const postSubtask = (taskId, subtask) => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/subtasks`;
  return fetch(url, generatePostRequest(JSON.stringify({ subtask })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      const { task, subtask } = res;
      dispatch(updateSubtaskData(subtask));
      dispatch(updateTaskData(task));
      return res;
    })
    .then((res) => {
      dispatch(postActivity(taskId, { crud_type: "c", item: "subtask" }));
      return res;
    });
};

const deleteSubtask = (taskId, subtaskId) => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/subtasks/${subtaskId}`;
  return fetch(url, generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      const { task, subtask } = res;
      dispatch(updateSubtaskData(subtask));
      dispatch(updateTaskData(task));
      return res;
    })
    .then((res) => {
      dispatch(postActivity(taskId, { crud_type: "d", item: "subtask" }));
      return res;
    });
};

export {
  fetchSubtasksRequest,
  fetchSubtasksSuccess,
  fetchSubtasksFailure,
  setSubtaskData,
  updateSubtaskData,
  postSubtask,
  deleteSubtask,
};

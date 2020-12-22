import normalize from "json-api-normalizer";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_DATA,
  UPDATE_TASK_DATA,
} from "./taskTypes";
import {
  fetchSubtasksRequest,
  fetchSubtasksSuccess,
  fetchSubtasksFailure,
  updateSubtaskData,
} from "../subtask/subtaskActions";
import {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  updateCommentData,
} from "../comment/commentActions";
import { setUserData } from "../user/userActions";
import { setProjectData } from "../project/projectActions";
import { setLabelData } from "../label/labelActions";
import {} from "../user/userActions";

import { generatePostRequest } from "../../helperFunctions";

const tasksUrl = "/api/v1/tasks";

const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

const fetchTasksSuccess = () => ({
  type: FETCH_TASKS_SUCCESS,
});

const fetchTasksFailure = (errMsg) => ({
  type: FETCH_TASKS_FAILURE,
  payload: errMsg,
});

const setTaskData = (taskData) => ({
  type: SET_TASK_DATA,
  payload: taskData,
});

// index
const fetchTasksData = () => (dispatch) => {
  // probably unnecessary
};

// show
const fetchTaskData = (taskId) => (dispatch) => {
  // TODO: pluralise subtasks?
  // differentiate loading all items vs loading 1 item
  // TODO: How to denote a particular item as loading? Is this even required? (I don't think so)

  // note, unlike in fetchUserData, taskData is assumed to be loaded, hence, no need for fetchTaskRequest
  dispatch(fetchSubtasksRequest());
  dispatch(fetchCommentsRequest());
  const url = `${tasksUrl}/${taskId}`;
  fetch(url)
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
      const { task, subtask, comment } = res;
      dispatch(updateSubtaskData(subtask));
      dispatch(updateCommentData(comment));
      dispatch(fetchSubtasksSuccess());
      dispatch(fetchCommentsSuccess());
    })
    .catch((err) => {
      dispatch(fetchSubtasksFailure(err.message));
      dispatch(fetchCommentsFailure(err.message));
    });
};

const updateTaskData = (taskData) => ({
  type: UPDATE_TASK_DATA,
  payload: taskData,
});

const postTask = (task) => (dispatch) => {
  fetch(tasksUrl, generatePostRequest(JSON.stringify({ task })))
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
      const { user, project, task, label } = res;
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  setTaskData,
  fetchTaskData,
  updateTaskData,
  postTask,
};

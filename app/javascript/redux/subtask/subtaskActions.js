import {
  FETCH_SUBTASKS_REQUEST,
  FETCH_SUBTASKS_SUCCESS,
  FETCH_SUBTASKS_FAILURE,
  SET_SUBTASK_DATA,
  UPDATE_SUBTASK_DATA,
} from "./subtaskTypes";

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

export {
  fetchSubtasksRequest,
  fetchSubtasksSuccess,
  fetchSubtasksFailure,
  setSubtaskData,
  updateSubtaskData,
};

import {
  FETCH_SUBTASK_REQUEST,
  FETCH_SUBTASK_SUCCESS,
  FETCH_SUBTASK_FAILURE,
  SET_SUBTASK_DATA,
} from "./subtaskTypes";

const fetchSubtaskRequest = () => ({
  type: FETCH_SUBTASK_REQUEST,
});

const fetchSubtaskSuccess = () => ({
  type: FETCH_SUBTASK_SUCCESS,
});

const fetchSubtaskFailure = (errMsg) => ({
  type: FETCH_SUBTASK_FAILURE,
  payload: errMsg,
});

const setSubtaskData = (subtaskData) => ({
  type: SET_SUBTASK_DATA,
  payload: subtaskData,
});

import {
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  SET_TASK_DATA,
} from "./taskTypes";

const fetchTaskRequest = () => ({
  type: FETCH_TASK_REQUEST,
});

const fetchTaskSuccess = () => ({
  type: FETCH_TASK_SUCCESS,
});

const fetchTaskFailure = (errMsg) => ({
  type: FETCH_TASK_FAILURE,
  payload: errMsg,
});

const setTaskData = (taskData) => ({
  type: SET_TASK_DATA,
  payload: taskData,
});

export { setTaskData };

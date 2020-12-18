import { SET_TASK_DATA } from "./taskTypes";

const setTaskData = (taskData) => ({
  type: SET_TASK_DATA,
  payload: taskData,
});

export { setTaskData };

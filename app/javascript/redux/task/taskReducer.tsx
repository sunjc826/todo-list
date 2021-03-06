import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_DATA,
  UPDATE_TASK_DATA,
  TaskActionType,
} from "./taskTypes";
import { State, TaskAttributes } from "../shared";

export interface TaskState extends State<TaskAttributes> {}

const initialTaskState: TaskState = {
  loading: false,
  data: null,
  errMsg: "",
};

const taskReducer = (
  state = initialTaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_TASK_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_TASK_DATA:
      const newData = {
        ...state.data,
        ...action.payload,
      };
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
};

export default taskReducer;

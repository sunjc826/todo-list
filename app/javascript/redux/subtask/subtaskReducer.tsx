import {
  FETCH_SUBTASKS_REQUEST,
  FETCH_SUBTASKS_SUCCESS,
  FETCH_SUBTASKS_FAILURE,
  SET_SUBTASK_DATA,
  UPDATE_SUBTASK_DATA,
  SubtaskActionType,
} from "./subtaskTypes";
import { State } from "../shared";
const initialSubtaskState: State = {
  loading: false,
  data: null,
  errMsg: "",
};

const subtaskReducer = (
  state = initialSubtaskState,
  action: SubtaskActionType
) => {
  switch (action.type) {
    case FETCH_SUBTASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUBTASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_SUBTASKS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_SUBTASK_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_SUBTASK_DATA:
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

export default subtaskReducer;

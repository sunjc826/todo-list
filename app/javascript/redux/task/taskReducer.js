import {
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  SET_TASK_DATA,
} from "./taskTypes";

const initialTaskState = {
  loading: false,
  data: null,
  errMsg: "",
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case FETCH_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_TASK_FAILURE:
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
    default:
      return state;
  }
};

export default taskReducer;

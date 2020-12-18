import {
  FETCH_SUBTASK_REQUEST,
  FETCH_SUBTASK_SUCCESS,
  FETCH_SUBTASK_FAILURE,
  SET_SUBTASK_DATA,
} from "./subtaskTypes";

const initialSubtaskState = {
  loading: false,
  data: null,
  errMsg: "",
};

const subtaskReducer = (state = initialSubtaskState, action) => {
  switch (action.type) {
    case FETCH_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_SUBTASK_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_SUBTASK_FAILURE:
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
    default:
      return state;
  }
};

export default subtaskReducer;

import { SET_LABEL_DATA } from "../label/labelTypes";
import { SET_TASK_DATA } from "./taskTypes";

const initialTaskState = { data: null };

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
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

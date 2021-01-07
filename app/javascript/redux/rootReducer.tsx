import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import tagReducer from "./tag/tagReducer";
import labelReducer from "./label/labelReducer";
import projectReducer from "./project/projectReducer";
import taskReducer from "./task/taskReducer";
import commentReducer from "./comment/commentReducer";
import subtaskReducer from "./subtask/subtaskReducer";
import filterReducer from "./filter/filterReducer";
import activityReducer from "./activity/activityReducer";

const rootReducer = combineReducers({
  comment: commentReducer,
  label: labelReducer,
  project: projectReducer,
  subtask: subtaskReducer,
  tag: tagReducer,
  task: taskReducer,
  user: userReducer,
  filter: filterReducer,
  activity: activityReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
export {RootState};

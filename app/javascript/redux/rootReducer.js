import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import tagReducer from "./tag/tagReducer";
import labelReducer from "./label/labelReducer";
import projectReducer from "./project/projectReducer";
import taskReducer from "./task/taskReducer";

const rootReducer = combineReducers({
  label: labelReducer,
  project: projectReducer,
  tag: tagReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;

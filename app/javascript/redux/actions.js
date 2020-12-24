// aggregate all action creators and thunks here
// The use of plural and singular forms are intentional

export {
  register,
  login,
  fetchIsLoggedIn,
  logout,
  setUserData,
  fetchUserData,
} from "./user/userActions";
export { fetchTaskData, postTask, deleteTask } from "./task/taskActions";
export { postComment, deleteComment } from "./comment/commentActions";
export { postSubtask, deleteSubtask } from "./subtask/subtaskActions";
export { postProject } from "./project/projectActions";
export { postLabel } from "./label/labelActions";
export { postFilter } from "./filter/filterActions";

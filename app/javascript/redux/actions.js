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
export {
  fetchTaskData,
  postTask,
  deleteTask,
  editTask,
} from "./task/taskActions";
export { postComment, deleteComment } from "./comment/commentActions";
export { postSubtask, deleteSubtask } from "./subtask/subtaskActions";
export { postProject, deleteProject } from "./project/projectActions";
export { postLabel } from "./label/labelActions";
export { postFilter } from "./filter/filterActions";

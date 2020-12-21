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
export { fetchTagsData } from "./tag/tagActions";
export { fetchTaskData } from "./task/taskActions";
export { postComment } from "./comment/commentActions";

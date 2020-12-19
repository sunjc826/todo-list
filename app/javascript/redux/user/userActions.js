import normalize from "json-api-normalizer";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
} from "./userTypes";
import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setProjectData,
} from "../project/projectActions";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  setTaskData,
} from "../task/taskActions";
import {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
} from "../label/labelActions";

const usersUrl = "/api/v1/users";

const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

const fetchUserSuccess = () => ({
  type: FETCH_USER_SUCCESS,
});

const fetchUserFailure = (errMsg) => ({
  type: FETCH_USER_FAILURE,
  payload: errMsg,
});

const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

const fetchUserData = (userId = 1) => (dispatch) => {
  // TODO: implement login system
  dispatch(fetchUserRequest());
  dispatch(fetchProjectsRequest());
  dispatch(fetchTasksRequest());
  dispatch(fetchLabelsRequest());
  const url = `${usersUrl}/${userId}`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      // console.log(res);
      // console.log(normalize(res));
      return normalize(res);
    })
    .then((res) => {
      // break up compound document into parts
      // and store into different parts of the redux store
      const { user, project, task, label } = res;
      // console.log(user);
      // console.log(project);
      // console.log(task);
      // console.log(label);
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
      dispatch(fetchUserSuccess());
      dispatch(fetchProjectsSuccess());
      dispatch(fetchTasksSuccess());
      dispatch(fetchLabelsSuccess());
    })
    .catch((err) => {
      // console.log(err);
      dispatch(fetchUserFailure(err.message));
      dispatch(fetchProjectsFailure(err.message));
      dispatch(fetchTasksFailure(err.message));
      dispatch(fetchLabelsFailure(err.message));
    });
};

export { setUserData, fetchUserData };

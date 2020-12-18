import normalize from "json-api-normalizer";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
} from "./userTypes";
import {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectFailure,
  setProjectData,
} from "../project/projectActions";
import {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskFailure,
  setTaskData,
} from "../task/taskActions";
import {
  fetchLabelRequest,
  fetchLabelSuccess,
  fetchLabelFailure,
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
  dispatch(fetchProjectRequest());
  dispatch(fetchTaskRequest());
  dispatch(fetchLabelRequest());
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
      dispatch(fetchUserSuccess());
      dispatch(fetchProjectSuccess());
      dispatch(fetchTaskSuccess());
      dispatch(fetchLabelSuccess());
      // break up compound document into parts
      // and store into different parts of the redux store
      const { user, project, task, label } = res;
      console.log(user);
      console.log(project);
      console.log(task);
      console.log(label);
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
    })
    .catch((err) => {
      // console.log(err);
      dispatch(fetchUserFailure(err.message));
      dispatch(fetchProjectFailure(err.message));
      dispatch(fetchTaskFailure(err.message));
      dispatch(fetchLabelFailure(err.message));
    });
};

export { setUserData, fetchUserData };

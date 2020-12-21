import normalize from "json-api-normalizer";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
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
import {
  generatePostRequest,
  generateDeleteRequest,
} from "../../helperFunctions";
const registrationsUrl = "/api/v1/registrations";
const sessionsUrl = "/api/v1/sessions";
const usersUrl = "/api/v1/users";

const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});

const registerSuccess = (userId) => ({
  type: REGISTER_SUCCESS,
  payload: userId,
});

const register = (registrationData) => (dispatch) => {
  fetch(
    registrationsUrl,
    generatePostRequest(JSON.stringify({ user: registrationData }))
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(registerSuccess(res.user_id));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const login = (loginData) => (dispatch) => {
  fetch(sessionsUrl, generatePostRequest(JSON.stringify({ user: loginData })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(loginSuccess(res.user_id));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const fetchIsLoggedIn = () => (dispatch) => {
  fetch(sessionsUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      console.log(res);
      if (res.logged_in) {
        dispatch(loginSuccess(res.user_id));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logout = () => (dispatch) => {
  fetch(sessionsUrl + "/logout", generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      console.log(res);
      dispatch(logoutSuccess());
    })
    .catch((err) => {
      console.log(err.message);
    });
};

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

const fetchUserData = (userId) => (dispatch) => {
  // TODO: implement login system
  dispatch(fetchUserRequest());
  dispatch(fetchProjectsRequest());
  dispatch(fetchTasksRequest());
  dispatch(fetchLabelsRequest());
  const url = `${usersUrl}/${userId}`;
  console.log(url);
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

export { register, login, fetchIsLoggedIn, logout, setUserData, fetchUserData };

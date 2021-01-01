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
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  setTagData,
} from "../tag/tagActions";
import {
  fetchFiltersRequest,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  setFilterData,
} from "../filter/filterActions";
import {
  fetchActivitiesFailure,
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  setActivityData,
} from "../activity/activityActions";
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
  return fetch(
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
      if (res.created) {
        dispatch(registerSuccess(res.user_id));
      }
      return res.created;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const login = (loginData) => (dispatch) => {
  return fetch(
    sessionsUrl,
    generatePostRequest(JSON.stringify({ user: loginData }))
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      if (res.logged_in) {
        dispatch(loginSuccess(res.user_id));
      }
      return res.logged_in;
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
  dispatch(fetchUserRequest());
  dispatch(fetchProjectsRequest());
  dispatch(fetchTasksRequest());
  dispatch(fetchLabelsRequest());
  dispatch(fetchTagsRequest());
  dispatch(fetchFiltersRequest());
  dispatch(fetchActivitiesRequest());
  const url = `${usersUrl}/${userId}`;
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      // break up compound document into parts
      // and store into different parts of the redux store
      const { user, project, task, label, tag, filter, activity } = res;
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
      dispatch(setTagData(tag));
      dispatch(setFilterData(filter));
      dispatch(setActivityData(activity));
      dispatch(fetchUserSuccess());
      dispatch(fetchProjectsSuccess());
      dispatch(fetchTasksSuccess());
      dispatch(fetchLabelsSuccess());
      dispatch(fetchTagsSuccess());
      dispatch(fetchFiltersSuccess());
      dispatch(fetchActivitiesSuccess());
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err.message));
      dispatch(fetchProjectsFailure(err.message));
      dispatch(fetchTasksFailure(err.message));
      dispatch(fetchLabelsFailure(err.message));
      dispatch(fetchTagsFailure(err.message));
      dispatch(fetchFiltersFailure(err.message));
      dispatch(fetchActivitiesFailure(err.message));
    });
};

export {
  register,
  login,
  fetchIsLoggedIn,
  logout,
  setUserData,
  fetchUserData,
  fetchUserRequest,
  fetchUserFailure,
};

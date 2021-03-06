import normalize from "json-api-normalizer";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
  RegisterSuccessAction,
  LoginSuccessAction,
  LogoutSuccessAction,
  FetchUserSuccessAction,
  FetchUserFailureAction,
  SetUserDataAction,
  FetchUserRequestAction,
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
import {
  Id,
  AppThunk,
  Data,
  NormalizedData,
  UserAttributes,
  AppDispatch,
} from "../shared";

const registrationsUrl = "/api/v1/registrations";
const sessionsUrl = "/api/v1/sessions";
const usersUrl = "/api/v1/users";

const loginSuccess = (userId: Id): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});

const registerSuccess = (userId: Id): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: userId,
});

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// ThunkAction generic type arguments
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.d.ts
const register = (
  registrationData: RegistrationData
): AppThunk<Promise<any>> => (dispatch) => {
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

interface LoginData {
  email: string;
  password: string;
}

const login = (loginData: LoginData): AppThunk<Promise<any>> => (dispatch) => {
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

const fetchIsLoggedIn = (): AppThunk => (dispatch) => {
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

const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

const logout = (): AppThunk => (dispatch) => {
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

const fetchUserRequest = (): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

const fetchUserSuccess = (): FetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
});

const fetchUserFailure = (errMsg: string): FetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  payload: errMsg,
});

const setUserData = (
  userData: Record<string, Data<UserAttributes>>
): SetUserDataAction => ({
  type: SET_USER_DATA,
  payload: userData,
});

const fetchUserData = (userId: Id): AppThunk<Promise<any>> => (dispatch) => {
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
    .then(
      (res): NormalizedData => {
        return normalize(res);
      }
    )
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
  fetchUserSuccess,
  fetchUserFailure,
};

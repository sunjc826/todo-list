import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  SET_PROJECT_DATA,
} from "./projectTypes";

const fetchProjectRequest = () => ({
  type: FETCH_PROJECT_REQUEST,
});

const fetchProjectSuccess = () => ({
  type: FETCH_PROJECT_SUCCESS,
});

const fetchProjectFailure = (errMsg) => ({
  type: FETCH_PROJECT_FAILURE,
  payload: errMsg,
});

const setProjectData = (projectData) => ({
  type: SET_PROJECT_DATA,
  payload: projectData,
});

export {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectFailure,
  setProjectData,
};

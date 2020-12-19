import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_DATA,
} from "./projectTypes";

const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

const fetchProjectsSuccess = () => ({
  type: FETCH_PROJECTS_SUCCESS,
});

const fetchProjectsFailure = (errMsg) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: errMsg,
});

const setProjectData = (projectData) => ({
  type: SET_PROJECT_DATA,
  payload: projectData,
});

export {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setProjectData,
};

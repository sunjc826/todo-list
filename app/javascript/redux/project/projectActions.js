import normalize from "json-api-normalizer";
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_DATA,
  UPDATE_PROJECT_DATA,
  SET_LAST_CREATED_PROJECT,
} from "./projectTypes";
import { generatePostRequest } from "../../helperFunctions";
import { setUserData } from "../user/userActions";

const projectsUrl = "/api/v1/projects";

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

const updateProjectData = (projectData) => ({
  type: UPDATE_PROJECT_DATA,
  payload: projectData,
});

const setLastCreatedProjectId = (projectId) => ({
  type: SET_LAST_CREATED_PROJECT,
  payload: projectId,
});

const postProject = (project) => (dispatch) => {
  // https://stackoverflow.com/questions/41812056/extract-both-json-and-headers-from-fetch

  return fetch(projectsUrl, generatePostRequest(JSON.stringify({ project })))
    .then((res) => {
      if (res.ok) {
        return res.json().then((json) => ({
          headers: res.headers,
          json,
        }));
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(({ headers, json }) => {
      return { headers, json: normalize(json) };
    })
    .then(({ headers, json }) => {
      // for (const pair of headers.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      // console.log(headers.get("last_created_project_id"));
      // console.log(json);
      const lastCreatedProjectId = headers.get("last_created_project_id");
      const { user, project } = json;
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setLastCreatedProjectId(lastCreatedProjectId));
      return lastCreatedProjectId;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setProjectData,
  updateProjectData,
  postProject,
};

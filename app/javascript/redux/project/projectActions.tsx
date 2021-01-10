import normalize from "json-api-normalizer";
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_DATA,
  UPDATE_PROJECT_DATA,
  SET_LAST_CREATED_PROJECT,
  FetchProjectsRequestAction,
  FetchProjectsSuccessAction,
  FetchProjectsFailureAction,
  SetProjectDataAction,
  UpdateProjectDataAction,
  SetLastCreatedProjectAction,
} from "./projectTypes";
import {
  generateDeleteRequest,
  generatePostRequest,
} from "../../helperFunctions";
import { setUserData } from "../user/userActions";
import {
  AppThunk,
  DataRecord,
  Id,
  NormalizedData,
  ProjectAttributes,
} from "../shared";

const projectsUrl = "/api/v1/projects";

const fetchProjectsRequest = (): FetchProjectsRequestAction => ({
  type: FETCH_PROJECTS_REQUEST,
});

const fetchProjectsSuccess = (): FetchProjectsSuccessAction => ({
  type: FETCH_PROJECTS_SUCCESS,
});

const fetchProjectsFailure = (errMsg: string): FetchProjectsFailureAction => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: errMsg,
});

const setProjectData = (
  projectData: DataRecord<ProjectAttributes>
): SetProjectDataAction => ({
  type: SET_PROJECT_DATA,
  payload: projectData,
});

const updateProjectData = (
  projectData: DataRecord<ProjectAttributes>
): UpdateProjectDataAction => ({
  type: UPDATE_PROJECT_DATA,
  payload: projectData,
});

const setLastCreatedProjectId = (
  projectId: Id
): SetLastCreatedProjectAction => ({
  type: SET_LAST_CREATED_PROJECT,
  payload: projectId,
});

interface ProjectData {
  title: string;
  content: string;
  completed: boolean;
}

const postProject = (project: ProjectData): AppThunk<Promise<any>> => (
  dispatch
) => {
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
    .then(({ headers, json }): { headers: Headers; json: NormalizedData } => {
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
      dispatch(setLastCreatedProjectId(lastCreatedProjectId)); // unnecessary
      return lastCreatedProjectId;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteProject = (projectId: Id): AppThunk<Promise<any>> => (dispatch) => {
  const url = `${projectsUrl}/${projectId}`;
  return fetch(url, generateDeleteRequest())
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
      const { user, project } = res;
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
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
  deleteProject,
};

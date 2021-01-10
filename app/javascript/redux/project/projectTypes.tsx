import { DataRecord, Id, ProjectAttributes } from "../shared";

export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";
export const SET_PROJECT_DATA = "SET_PROJECT_DATA";
export const UPDATE_PROJECT_DATA = "UPDATE_PROJECT_DATA";
export const SET_LAST_CREATED_PROJECT = "SET_LAST_CREATED_PROJECT";

export interface FetchProjectsRequestAction {
  type: typeof FETCH_PROJECTS_REQUEST;
}

export interface FetchProjectsSuccessAction {
  type: typeof FETCH_PROJECTS_SUCCESS;
}

export interface FetchProjectsFailureAction {
  type: typeof FETCH_PROJECTS_FAILURE;
  payload: string;
}

export interface SetProjectDataAction {
  type: typeof SET_PROJECT_DATA;
  payload: DataRecord<ProjectAttributes>;
}

export interface UpdateProjectDataAction {
  type: typeof UPDATE_PROJECT_DATA;
  payload: DataRecord<ProjectAttributes>;
}

export interface SetLastCreatedProjectAction {
  type: typeof SET_LAST_CREATED_PROJECT;
  payload: Id;
}

export type ProjectActionType =
  | FetchProjectsRequestAction
  | FetchProjectsSuccessAction
  | FetchProjectsFailureAction
  | SetProjectDataAction
  | UpdateProjectDataAction
  | SetLastCreatedProjectAction;

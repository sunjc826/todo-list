import { DataRecord } from "../shared";

export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";
export const SET_TASK_DATA = "SET_TASK_DATA";
export const UPDATE_TASK_DATA = "UPDATE_TASK_DATA";

export interface FetchTasksRequestAction {
  type: typeof FETCH_TASKS_REQUEST;
}

export interface FetchTasksSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS;
}

export interface FetchTasksFailureAction {
  type: typeof FETCH_TASKS_FAILURE;
  payload: string;
}

export interface SetTaskDataAction {
  type: typeof SET_TASK_DATA;
  payload: DataRecord;
}

export interface UpdateTaskDataAction {
  type: typeof UPDATE_TASK_DATA;
  payload: DataRecord;
}

export type TaskActionType =
  | FetchTasksRequestAction
  | FetchTasksSuccessAction
  | FetchTasksFailureAction
  | SetTaskDataAction
  | UpdateTaskDataAction;

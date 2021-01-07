export const FETCH_SUBTASKS_REQUEST = "FETCH_SUBTASKS_REQUEST";
export const FETCH_SUBTASKS_SUCCESS = "FETCH_SUBTASKS_SUCCESS";
export const FETCH_SUBTASKS_FAILURE = "FETCH_SUBTASKS_FAILURE";
export const SET_SUBTASK_DATA = "SET_SUBTASK_DATA";
export const UPDATE_SUBTASK_DATA = "UPDATE_SUBTASK_DATA";

export interface FetchSubtasksRequestAction {
  type: typeof FETCH_SUBTASKS_REQUEST;
}

export interface FetchSubtasksSuccessAction {
  type: typeof FETCH_SUBTASKS_SUCCESS;
}

export interface FetchSubtasksFailureAction {
  type: typeof FETCH_SUBTASKS_FAILURE;
  payload: string;
}

export interface SetSubtaskDataAction {
  type: typeof SET_SUBTASK_DATA;
  payload: object;
}

export interface UpdateSubtaskDataAction {
  type: typeof UPDATE_SUBTASK_DATA;
  payload: object;
}

export type SubtaskActionType = 
  | FetchSubtasksRequestAction
  | FetchSubtasksSuccessAction
  | FetchSubtasksFailureAction
  | SetSubtaskDataAction
  | UpdateSubtaskDataAction;
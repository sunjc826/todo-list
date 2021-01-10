import { DataRecord } from "../shared";

export const FETCH_ACTIVITIES_REQUEST = "FETCH_ACTIVITIES_REQUEST";
export const FETCH_ACTIVITIES_SUCCESS = "FETCH_ACTIVITIES_SUCCESS";
export const FETCH_ACTIVITIES_FAILURE = "FETCH_ACTIVITIES_FAILURE";
export const SET_ACTIVITY_DATA = "SET_ACTIVITY_DATA";
export const UPDATE_ACTIVITY_DATA = "UPDATE_ACTIVITY_DATA";

export interface FetchActivitiesRequestAction {
  type: typeof FETCH_ACTIVITIES_REQUEST;
}

export interface FetchActivitiesSuccessAction {
  type: typeof FETCH_ACTIVITIES_SUCCESS;
}

export interface FetchActivitiesFailureAction {
  type: typeof FETCH_ACTIVITIES_FAILURE;
  payload: string;
}

export interface SetActivityDataAction {
  type: typeof SET_ACTIVITY_DATA;
  payload: DataRecord;
}

export interface UpdateActivityDataAction {
  type: typeof UPDATE_ACTIVITY_DATA;
  payload: DataRecord;
}

export type ActivityActionType =
  | FetchActivitiesRequestAction
  | FetchActivitiesSuccessAction
  | FetchActivitiesFailureAction
  | SetActivityDataAction
  | UpdateActivityDataAction;

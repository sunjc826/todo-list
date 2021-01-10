import { DataRecord } from "../shared";

export const FETCH_FILTERS_REQUEST = "FETCH_FILTERS_REQUEST";
export const FETCH_FILTERS_SUCCESS = "FETCH_FILTERS_SUCCESS";
export const FETCH_FILTERS_FAILURE = "FETCH_FILTERS_FAILURE";
export const SET_FILTER_DATA = "SET_FILTER_DATA";

export interface FetchFiltersRequestAction {
  type: typeof FETCH_FILTERS_REQUEST;
}

export interface FetchFiltersSuccessAction {
  type: typeof FETCH_FILTERS_SUCCESS;
}

export interface FetchFiltersFailureAction {
  type: typeof FETCH_FILTERS_FAILURE;
  payload: string;
}

export interface SetFilterDataAction {
  type: typeof SET_FILTER_DATA;
  payload: DataRecord;
}

export type FilterActionType =
  | FetchFiltersRequestAction
  | FetchFiltersSuccessAction
  | FetchFiltersFailureAction
  | SetFilterDataAction;

import { DataRecord } from "../shared";

export const FETCH_LABELS_REQUEST = "FETCH_LABELS_REQUEST";
export const FETCH_LABELS_SUCCESS = "FETCH_LABELS_SUCCESS";
export const FETCH_LABELS_FAILURE = "FETCH_LABELS_FAILURE";
export const SET_LABEL_DATA = "SET_LABEL_DATA";

export interface FetchLabelsRequestAction {
  type: typeof FETCH_LABELS_REQUEST;
}

export interface FetchLabelsSuccessAction {
  type: typeof FETCH_LABELS_SUCCESS;
}

export interface FetchLabelsFailureAction {
  type: typeof FETCH_LABELS_FAILURE;
  payload: string;
}

export interface SetLabelDataAction {
  type: typeof SET_LABEL_DATA;
  payload: DataRecord;
}

export type LabelActionType =
  | FetchLabelsRequestAction
  | FetchLabelsSuccessAction
  | FetchLabelsFailureAction
  | SetLabelDataAction;

export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";
export const SET_TAG_DATA = "SET_TAG_DATA";

export interface FetchTagsRequestAction {
  type: typeof FETCH_TAGS_REQUEST;
}

export interface FetchTagsSuccessAction {
  type: typeof FETCH_TAGS_SUCCESS;
}

export interface FetchTagsFailureAction {
  type: typeof FETCH_TAGS_FAILURE;
  payload: string;
}

export interface SetTagDataAction {
  type: typeof SET_TAG_DATA;
  payload: object;
}

export type TagActionType = 
  | FetchTagsRequestAction
  | FetchTagsSuccessAction
  | FetchTagsFailureAction
  | SetTagDataAction;
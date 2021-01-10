import { CommentAttributes, DataRecord, Id } from "../shared";

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";
export const SET_COMMENT_DATA = "SET_COMMENT_DATA";
export const UPDATE_COMMENT_DATA = "UPDATE_COMMENT_DATA";

export interface FetchCommentsRequestAction {
  type: typeof FETCH_COMMENTS_REQUEST;
}

export interface FetchCommentsSuccessAction {
  type: typeof FETCH_COMMENTS_SUCCESS;
}

export interface FetchCommentsFailureAction {
  type: typeof FETCH_COMMENTS_FAILURE;
  payload: string;
}

export interface SetCommentDataAction {
  type: typeof SET_COMMENT_DATA;
  payload: DataRecord<CommentAttributes>;
}

export interface UpdateCommentDataAction {
  type: typeof UPDATE_COMMENT_DATA;
  payload: DataRecord<CommentAttributes>;
}

export type CommentActionType =
  | FetchCommentsRequestAction
  | FetchCommentsSuccessAction
  | FetchCommentsFailureAction
  | SetCommentDataAction
  | UpdateCommentDataAction;

import { Id } from "../shared";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const SET_USER_DATA = "SET_USER_DATA";

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: Id;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: Id;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
}

export interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: object;
}

export type UserActionType =
  | RegisterSuccessAction
  | LoginSuccessAction
  | LogoutSuccessAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | SetUserDataAction;

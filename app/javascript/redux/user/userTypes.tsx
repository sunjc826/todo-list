export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const SET_USER_DATA = "SET_USER_DATA";

export type UserId = number | string | null;

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: UserId;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserId;
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

export interface UserState {
  loading: boolean,
  data: object | null,
  errMsg: string,
  loggedIn: boolean,
  userId: UserId,
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: UserState;
}

export type UserActionType = 
  | RegisterSuccessAction 
  | LoginSuccessAction
  | LogoutSuccessAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | SetUserDataAction
import { ThunkAction } from "redux-thunk";
import { RootState } from "./rootReducer";
import { Action } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface State {
  loading: boolean;
  data: object | null;
  errMsg: string;
}

export type Id = number | string | null;

export type BootstrapColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

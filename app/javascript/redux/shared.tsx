import { ThunkAction } from "redux-thunk";
import { RootState } from "./rootReducer";
import { Action } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface Data {
  attributes: Record<string, any>;
  id: string;
  relationships: Record<string, any>;
  type: string;
}

export type DataRecord = Record<string, Data>;

export interface State {
  loading: boolean;
  data: DataRecord | null;
  errMsg: string;
}

export type Entity =
  | "user"
  | "project"
  | "task"
  | "label"
  | "tag"
  | "filter"
  | "comment"
  | "subtask"
  | "activity";

export type NormalizedData = Record<Entity, DataRecord>;

export type Id = number | string | null;

export type BootstrapColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

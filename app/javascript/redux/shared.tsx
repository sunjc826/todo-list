import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "./rootReducer";
import { Action } from "redux";

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

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

export type RelationshipEntity =
  | "projects"
  | "tasks"
  | "labels"
  | "tags"
  | "filters"
  | "comments"
  | "subtasks"
  | "activities";

export type NonUserRelationshipRecord = Record<
  RelationshipEntity,
  { data: Array<{ id: string }> }
>;

export type UserRelationshipRecord = Record<
  RelationshipEntity,
  { data: { id: string } }
>;

type RelationshipRecord = Record<
  RelationshipEntity,
  { data: Array<{ id: string }> | { id: string } }
>;

// under relationships, I'm not sure how to create an exception for users
// Array<{ id: string }> is the form taken by all other relationship entities
// { id: string } is the form taken by users
export interface Data {
  attributes: Record<string, any>;
  id: string;
  relationships: NonUserRelationshipRecord; // | UserRelationshipRecord
  type: string;
}

export type DataRecord = Record<string, Data>;

export interface State {
  loading: boolean;
  data: DataRecord | null;
  errMsg: string;
}

export type NormalizedData = Record<Entity, DataRecord>;

export type Id = number | string | null;

export type BootstrapColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

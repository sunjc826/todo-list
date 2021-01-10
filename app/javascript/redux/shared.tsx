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

export type Id = number | string | null;

export type BootstrapColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type CrudType = "c" | "u" | "d";

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
export interface Data<T = Record<string, any>> {
  attributes: T;
  id: string;
  relationships: NonUserRelationshipRecord; // | UserRelationshipRecord
  type: string;
}

export type DataRecord<T = Record<string, any>> = Record<string, Data<T>>;

export interface State<T = Record<string, any>> {
  loading: boolean;
  data: DataRecord<T> | null;
  errMsg: string;
}

export interface UserAttributes {
  email: string;
  name: string;
}

export interface TaskAttributes {
  completed: boolean;
  content: string;
  dateString: string;
  deadline: string;
  priority: number;
  projectId?: Id;
  userId: Id;
}

export interface TagAttributes {
  description: string;
}

export interface SubtaskAttributes {
  completed: boolean;
  content: string;
  taskId: Id;
}

export interface ProjectAttributes {
  completed: boolean;
  content: string;
  title: string;
  userId: Id;
}

export interface LabelAttributes {
  description: string;
  color: BootstrapColor;
  userId: Id;
}

export interface FilterAttributes {
  description: string;
  enddate: string;
  startdate: string;
  userId: Id;
}

export interface CommentAttributes {
  content: string;
  taskId: Id;
}

export interface ActivityAttributes {
  createdAt: string;
  crudType: CrudType;
  item: "task" | "subtask" | "comment";
}

// Record<Entity, DataRecord>;
export interface NormalizedData {
  user: DataRecord<UserAttributes>;
  project: DataRecord<ProjectAttributes>;
  task: DataRecord<TaskAttributes>;
  label: DataRecord<LabelAttributes>;
  tag: DataRecord<TagAttributes>;
  filter: DataRecord<FilterAttributes>;
  comment: DataRecord<CommentAttributes>;
  subtask: DataRecord<SubtaskAttributes>;
  activity: DataRecord<ActivityAttributes>;
}

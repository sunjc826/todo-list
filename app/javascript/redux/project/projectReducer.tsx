import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_DATA,
  UPDATE_PROJECT_DATA,
  SET_LAST_CREATED_PROJECT,
  ProjectActionType,
} from "./projectTypes";
import { State, Id } from "../shared";
export interface ProjectState extends State {
  lastCreatedProjectId: Id;
}

const initialProjectState: ProjectState = {
  loading: false,
  data: null,
  errMsg: "",
  lastCreatedProjectId: null,
};

const projectReducer = (
  state = initialProjectState,
  action: ProjectActionType
) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_PROJECT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_PROJECT_DATA:
      const newData = {
        ...state.data,
        ...action.payload,
      };
      return {
        ...state,
        data: newData,
      };
    case SET_LAST_CREATED_PROJECT:
      return {
        ...state,
        lastCreatedProjectId: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;

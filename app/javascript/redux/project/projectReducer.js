import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_DATA,
} from "./projectTypes";

const initialProjectState = {
  loading: false,
  data: null,
  errMsg: "",
};

const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
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
    default:
      return state;
  }
};

export default projectReducer;

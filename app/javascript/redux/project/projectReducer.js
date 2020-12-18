import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  SET_PROJECT_DATA,
} from "./projectTypes";

const initialProjectState = {
  loading: false,
  data: null,
  errMsg: "",
};

const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_PROJECT_FAILURE:
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

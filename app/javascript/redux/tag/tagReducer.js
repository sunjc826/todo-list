import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SET_TAGS_DATA,
} from "./tagTypes";

const defaultTags = {
  loading: false,
  data: null,
  errMsg: "",
};

const tagReducer = (state = defaultTags, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_TAGS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default tagReducer;

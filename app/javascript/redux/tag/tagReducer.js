import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "./tagTypes";

const defaultTags = {
  loading: false,
  data: [],
  errMsg: "",
};

const tagReducer = (state = defaultTags, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        err: "",
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        err: "",
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        err: action.payload,
      };
    default:
      return state;
  }
};

export default tagReducer;

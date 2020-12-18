import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  SET_COMMENT_DATA,
} from "./commentTypes";

const initialCommentState = {
  loading: false,
  data: null,
  errMsg: "",
};

const commentReducer = (state = initialCommentState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_COMMENT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;

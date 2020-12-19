import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SET_COMMENT_DATA,
} from "./commentTypes";

const initialCommentState = {
  loading: false,
  data: null,
  errMsg: "",
};

const commentReducer = (state = initialCommentState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        errMsg: "",
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_COMMENTS_FAILURE:
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

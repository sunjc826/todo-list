import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  SET_COMMENT_DATA,
  UPDATE_COMMENT_DATA,
  CommentActionType,
} from "./commentTypes";
import { State } from "../shared";
const initialCommentState: State = {
  loading: false,
  data: null,
  errMsg: "",
};

const commentReducer = (
  state = initialCommentState,
  action: CommentActionType
): State => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
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
    case UPDATE_COMMENT_DATA:
      const newData = {
        ...state.data,
        ...action.payload,
      };
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
};

export default commentReducer;

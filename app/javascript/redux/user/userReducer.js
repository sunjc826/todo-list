import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

const defaultUser = {
  loading: false,
  data: {},
  errMsg: "",
};

const userReducer = (state = defaultUser, action) => {
  switch (action.state) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
        err: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        err: "",
      };
    case FETCH_USER_FAILURE:
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

export default userReducer;

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
} from "./userTypes";

const initialUserState = {
  loading: false,
  data: null,
  errMsg: "",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
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
        err: "",
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        err: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

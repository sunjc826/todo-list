import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
} from "./userTypes";

const initialUserState = {
  loading: false,
  data: null,
  errMsg: "",
  loggedIn: false,
  userId: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    // the response to register_success and login_success are effectively the same
    // however, I decide to separate them for clarity
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        userId: null,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
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

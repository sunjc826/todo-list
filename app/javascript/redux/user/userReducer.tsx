import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
  UserActionType,
} from "./userTypes";
import { State, Id } from "../shared";

export interface UserState extends State {
  loggedIn: boolean;
  userId: Id;
}

//check authentication
const initialUserState: UserState = {
  loading: false,
  data: null,
  errMsg: "",
  loggedIn: false,
  userId: null,
};

const userReducer = (
  state = initialUserState,
  action: UserActionType
): UserState => {
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
        data: null, // protect user data from theft
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

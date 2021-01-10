import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  SET_ACTIVITY_DATA,
  UPDATE_ACTIVITY_DATA,
  ActivityActionType,
} from "./activityTypes";
import { ActivityAttributes, State } from "../shared";

export interface ActivityState extends State<ActivityAttributes> {}

const defaultActivityState: ActivityState = {
  loading: false,
  data: null,
  errMsg: "",
};

const activityReducer = (
  state = defaultActivityState,
  action: ActivityActionType
): ActivityState => {
  switch (action.type) {
    case FETCH_ACTIVITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_ACTIVITY_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_ACTIVITY_DATA:
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

export default activityReducer;

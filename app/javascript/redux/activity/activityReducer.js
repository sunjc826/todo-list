import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  SET_ACTIVITY_DATA,
  UPDATE_ACTIVITY_DATA,
} from "./activityTypes";

const defaultActivityState = { loading: false, data: null, errMsg: "" };

const activityReducer = (state = defaultActivityState, action) => {
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

import {
  FETCH_FILTERS_REQUEST,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS_FAILURE,
  SET_FILTER_DATA,
} from "./filterTypes";

const initialFilterState = {
  loading: false,
  data: null,
  errMsg: "",
};

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case FETCH_FILTERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_FILTERS_FAILURE:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };
    case SET_FILTER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
import {
  FETCH_LABELS_REQUEST,
  FETCH_LABELS_SUCCESS,
  FETCH_LABELS_FAILURE,
  SET_LABEL_DATA,
} from "./labelTypes";

const initialLabelState = {
  loading: false,
  data: null,
  errMsg: "",
};

const labelReducer = (state = initialLabelState, action) => {
  switch (action.type) {
    case FETCH_LABELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LABELS_SUCCESS:
      return {
        ...state,
        loading: false,
        errMsg: "",
      };
    case FETCH_LABELS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        errMsg: action.payload,
      };
    case SET_LABEL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default labelReducer;

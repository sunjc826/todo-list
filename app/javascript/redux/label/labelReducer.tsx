import {
  FETCH_LABELS_REQUEST,
  FETCH_LABELS_SUCCESS,
  FETCH_LABELS_FAILURE,
  SET_LABEL_DATA,
  LabelActionType,
} from "./labelTypes";
import { LabelAttributes, State } from "../shared";

export interface LabelState extends State<LabelAttributes> {}

const initialLabelState: LabelState = {
  loading: false,
  data: null,
  errMsg: "",
};

const labelReducer = (
  state = initialLabelState,
  action: LabelActionType
): LabelState => {
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

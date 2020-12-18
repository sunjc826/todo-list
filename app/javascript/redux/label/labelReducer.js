import { SET_LABEL_DATA } from "./labelTypes";

const initialLabelState = { data: null };

const labelReducer = (state = initialLabelState, action) => {
  switch (action.type) {
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

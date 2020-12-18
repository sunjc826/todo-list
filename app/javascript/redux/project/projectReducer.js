import { SET_PROJECT_DATA } from "./projectTypes";

const initialProjectState = { data: null };

const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case SET_PROJECT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;

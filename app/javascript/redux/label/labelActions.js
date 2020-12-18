import { SET_LABEL_DATA } from "./labelTypes";

const setLabelData = (labelData) => ({
  type: SET_LABEL_DATA,
  payload: labelData,
});

export { setLabelData };

import {
  FETCH_LABEL_REQUEST,
  FETCH_LABEL_SUCCESS,
  FETCH_LABEL_FAILURE,
  SET_LABEL_DATA,
} from "./labelTypes";

const fetchLabelRequest = () => ({
  type: FETCH_LABEL_REQUEST,
});

const fetchLabelSuccess = () => ({
  type: FETCH_LABEL_SUCCESS,
});

const fetchLabelFailure = (errMsg) => ({
  type: FETCH_LABEL_FAILURE,
  payload: errMsg,
});

const setLabelData = (labelData) => ({
  type: SET_LABEL_DATA,
  payload: labelData,
});

export { setLabelData };

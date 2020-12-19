import {
  FETCH_LABELS_REQUEST,
  FETCH_LABELS_SUCCESS,
  FETCH_LABELS_FAILURE,
  SET_LABEL_DATA,
} from "./labelTypes";

const fetchLabelsRequest = () => ({
  type: FETCH_LABELS_REQUEST,
});

const fetchLabelsSuccess = () => ({
  type: FETCH_LABELS_SUCCESS,
});

const fetchLabelsFailure = (errMsg) => ({
  type: FETCH_LABELS_FAILURE,
  payload: errMsg,
});

const setLabelData = (labelData) => ({
  type: SET_LABEL_DATA,
  payload: labelData,
});

export {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
};

import normalize from "json-api-normalizer";
import { generatePostRequest } from "../../helperFunctions";
import {
  FETCH_LABELS_REQUEST,
  FETCH_LABELS_SUCCESS,
  FETCH_LABELS_FAILURE,
  SET_LABEL_DATA,
} from "./labelTypes";
const labelsUrl = `/api/v1/labels`;
import { setUserData } from "../user/userActions";

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

const postLabel = (label) => (dispatch) => {
  fetch(labelsUrl, generatePostRequest(JSON.stringify({ label })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      return normalize(res);
    })
    .then((res) => {
      const { user, label } = res;
      dispatch(setUserData(user));
      dispatch(setLabelData(label));
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
  postLabel,
};

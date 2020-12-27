import normalize from "json-api-normalizer";
import {
  generatePostRequest,
  generateDeleteRequest,
} from "../../helperFunctions";
import {
  FETCH_LABELS_REQUEST,
  FETCH_LABELS_SUCCESS,
  FETCH_LABELS_FAILURE,
  SET_LABEL_DATA,
} from "./labelTypes";
const labelsUrl = `/api/v1/labels`;
import { setUserData } from "../user/userActions";
import { setTaskData } from "../task/taskActions";
import { setFilterData } from "../filter/filterActions";

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
  return fetch(labelsUrl, generatePostRequest(JSON.stringify({ label })))
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
    });
};

const deleteLabel = (labelId) => (dispatch) => {
  const url = `${labelsUrl}/${labelId}`;
  return fetch(url, generateDeleteRequest())
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
      const { user, label, task, filter } = res;
      dispatch(setUserData(user));
      dispatch(setLabelData(label));
      dispatch(setFilterData(filter));
      dispatch(setTaskData(task));
    });
};

export {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
  postLabel,
  deleteLabel,
};

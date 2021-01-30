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
  FetchLabelsRequestAction,
  FetchLabelsSuccessAction,
  FetchLabelsFailureAction,
  SetLabelDataAction,
} from "./labelTypes";
const labelsUrl = `/api/v1/labels`;
import { setUserData } from "../user/userActions";
import { setTaskData } from "../task/taskActions";
import { setFilterData } from "../filter/filterActions";
import {
  AppThunk,
  BootstrapColor,
  DataRecord,
  Id,
  LabelAttributes,
  NormalizedData,
} from "../shared";

const fetchLabelsRequest = (): FetchLabelsRequestAction => ({
  type: FETCH_LABELS_REQUEST,
});

const fetchLabelsSuccess = (): FetchLabelsSuccessAction => ({
  type: FETCH_LABELS_SUCCESS,
});

const fetchLabelsFailure = (errMsg: string): FetchLabelsFailureAction => ({
  type: FETCH_LABELS_FAILURE,
  payload: errMsg,
});

const setLabelData = (
  labelData: DataRecord<LabelAttributes>
): SetLabelDataAction => ({
  type: SET_LABEL_DATA,
  payload: labelData,
});

interface LabelData {
  description: string;
  color: BootstrapColor;
}

const postLabel = (label: LabelData): AppThunk<Promise<any>> => (dispatch) => {
  return fetch(labelsUrl, generatePostRequest(JSON.stringify({ label })))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(
      (res): NormalizedData => {
        return normalize(res);
      }
    )
    .then((res) => {
      const { user, label } = res;
      dispatch(setUserData(user));
      dispatch(setLabelData(label));
    });
};

const deleteLabel = (labelId: Id): AppThunk<Promise<any>> => (dispatch) => {
  const url = `${labelsUrl}/${labelId}`;
  return fetch(url, generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(
      (res): NormalizedData => {
        return normalize(res);
      }
    )
    .then((res) => {
      const { user, label, task, filter } = res;
      dispatch(setUserData(user));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
      dispatch(setFilterData(filter));
    });
};

export {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
  postLabel,
  deleteLabel,
  LabelData,
};

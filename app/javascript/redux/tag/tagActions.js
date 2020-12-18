import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
} from "./tagTypes";
import normalize from "json-api-normalizer";

const tagsUrl = "/api/v1/tags";

const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

const fetchTagsSuccess = (userData) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: userData,
});

const fetchTagsFailure = (errMsg) => ({
  type: FETCH_TAGS_FAILURE,
  payload: errMsg,
});

const fetchTagsData = () => (dispatch) => {
  dispatch(fetchTagsRequest());
  const url = tagsUrl;
  fetch(url)
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
      dispatch(fetchTagsSuccess(res));
    })
    .catch((err) => {
      dispatch(fetchTagsFailure(err.message));
    });
};

export { fetchTagsData };

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SET_TAGS_DATA,
} from "./tagTypes";
import normalize from "json-api-normalizer";

const tagsUrl = "/api/v1/tags";

const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

const fetchTagsSuccess = () => ({
  type: FETCH_TAGS_SUCCESS,
});

const fetchTagsFailure = (errMsg) => ({
  type: FETCH_TAGS_FAILURE,
  payload: errMsg,
});

const setTagsData = (tagsData) => ({
  type: SET_TAGS_DATA,
  payload: tagsData,
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
      const { tag } = res;
      dispatch(fetchTagsSuccess());
      dispatch(setTagsData(tag));
    })
    .catch((err) => {
      dispatch(fetchTagsFailure(err.message));
    });
};

export { fetchTagsData };

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SET_TAG_DATA,
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

const setTagData = (tagsData) => ({
  type: SET_TAG_DATA,
  payload: tagsData,
});

// We are no longer fetching all tags. Tags have been refactored to belong_to a user.

// const fetchTagsData = () => (dispatch) => {
//   dispatch(fetchTagsRequest());
//   const url = tagsUrl;
//   fetch(url)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error(res.statusText);
//       }
//     })
//     .then((res) => {
//       return normalize(res);
//     })
//     .then((res) => {
//       const { tag } = res;
//       dispatch(fetchTagsSuccess());
//       dispatch(setTagsData(tag));
//     })
//     .catch((err) => {
//       dispatch(fetchTagsFailure(err.message));
//     });
// };

export { fetchTagsRequest, fetchTagsSuccess, fetchTagsFailure, setTagData };

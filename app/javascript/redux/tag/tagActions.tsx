import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SET_TAG_DATA,
  FetchTagsRequestAction,
  FetchTagsSuccessAction,
  FetchTagsFailureAction,
  SetTagDataAction,
} from "./tagTypes";
import normalize from "json-api-normalizer";
import { DataRecord, TagAttributes } from "../shared";

const tagsUrl = "/api/v1/tags";

const fetchTagsRequest = (): FetchTagsRequestAction => ({
  type: FETCH_TAGS_REQUEST,
});

const fetchTagsSuccess = (): FetchTagsSuccessAction => ({
  type: FETCH_TAGS_SUCCESS,
});

const fetchTagsFailure = (errMsg: string): FetchTagsFailureAction => ({
  type: FETCH_TAGS_FAILURE,
  payload: errMsg,
});

const setTagData = (tagsData: DataRecord<TagAttributes>): SetTagDataAction => ({
  type: SET_TAG_DATA,
  payload: tagsData,
});

interface TagData {
  description: string;
}

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

export {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  setTagData,
  TagData,
};

import normalize from "json-api-normalizer";
import {
  FETCH_FILTERS_REQUEST,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS_FAILURE,
  SET_FILTER_DATA,
  FetchFiltersRequestAction,
  FetchFiltersSuccessAction,
  FetchFiltersFailureAction,
  SetFilterDataAction,
} from "./filterTypes";
import { setUserData } from "../user/userActions";
import { setTagData, TagData } from "../tag/tagActions";
import { LabelData, setLabelData } from "../label/labelActions";
import { generatePostRequest } from "../../helperFunctions";
import { AppThunk, DataRecord, NormalizedData } from "../shared";
const filtersUrl = "/api/v1/filters";

const fetchFiltersRequest = (): FetchFiltersRequestAction => ({
  type: FETCH_FILTERS_REQUEST,
});

const fetchFiltersSuccess = (): FetchFiltersSuccessAction => ({
  type: FETCH_FILTERS_SUCCESS,
});

const fetchFiltersFailure = (errMsg: string): FetchFiltersFailureAction => ({
  type: FETCH_FILTERS_FAILURE,
  payload: errMsg,
});

const setFilterData = (filterData: DataRecord): SetFilterDataAction => ({
  type: SET_FILTER_DATA,
  payload: filterData,
});

interface FilterData {
  description: string;
  startdate: string;
  enddate: string;
}

const postFilter = ({
  filter,
  tag,
  label,
}: {
  filter: FilterData;
  tag: object;
  label: object;
}): AppThunk => (dispatch) => {
  return fetch(
    filtersUrl,
    generatePostRequest(
      JSON.stringify({
        filter,
        tag: { tags: tag },
        label: { labels: label },
      })
    )
  )
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
      console.log(res);
      const { user, filter, tag, label } = res;

      // is loading required here?
      // since this is async, would the time difference between dispatching
      // the first setData to dispatching the last setData
      // cause concurrency issues?

      dispatch(setUserData(user));
      dispatch(setTagData(tag));
      dispatch(setLabelData(label));
      dispatch(setFilterData(filter));
      return res;
    });
};

export {
  fetchFiltersRequest,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  setFilterData,
  postFilter,
};

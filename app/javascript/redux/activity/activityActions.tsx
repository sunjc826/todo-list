import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  SET_ACTIVITY_DATA,
  UPDATE_ACTIVITY_DATA,
  FetchActivitiesRequestAction,
  FetchActivitiesSuccessAction,
  FetchActivitiesFailureAction,
  SetActivityDataAction,
  UpdateActivityDataAction,
} from "./activityTypes";
import { generatePostRequest } from "../../helperFunctions";
import normalize from "json-api-normalizer";
import { updateTaskData } from "../task/taskActions";
import {
  ActivityAttributes,
  AppThunk,
  CrudType,
  DataRecord,
  Id,
  NormalizedData,
} from "../shared";

const fetchActivitiesRequest = (): FetchActivitiesRequestAction => ({
  type: FETCH_ACTIVITIES_REQUEST,
});

const fetchActivitiesSuccess = (): FetchActivitiesSuccessAction => ({
  type: FETCH_ACTIVITIES_SUCCESS,
});

const fetchActivitiesFailure = (
  errMsg: string
): FetchActivitiesFailureAction => ({
  type: FETCH_ACTIVITIES_FAILURE,
  payload: errMsg,
});

const setActivityData = (
  activityData: DataRecord<ActivityAttributes>
): SetActivityDataAction => ({
  type: SET_ACTIVITY_DATA,
  payload: activityData,
});

const updateActivityData = (
  activityData: DataRecord<ActivityAttributes>
): UpdateActivityDataAction => ({
  type: UPDATE_ACTIVITY_DATA,
  payload: activityData,
});

// note that posting the activity does not re-fetch the user
// although the user has_many activities, for efficiency,
// user relations (w.r.t. activities) are not updated when posting an activity
const postActivity = (
  taskId: Id,
  activity: { crud_type: CrudType; item: "task" | "subtask" | "comment" }
): AppThunk => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/activities`;
  return fetch(url, generatePostRequest(JSON.stringify({ activity })))
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
      const { activity } = res;
      dispatch(updateActivityData(activity));
      return res;
    })
    .then((res) => {
      const { task } = res;
      dispatch(updateTaskData(task));
    });
};

export {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  setActivityData,
  updateActivityData,
  postActivity,
};

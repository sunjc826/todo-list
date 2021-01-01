import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  SET_ACTIVITY_DATA,
  UPDATE_ACTIVITY_DATA,
} from "./activityTypes";
import {
  generateDeleteRequest,
  generatePostRequest,
} from "../../helperFunctions";
import normalize from "json-api-normalizer";
import { updateTaskData } from "../task/taskActions";

const fetchActivitiesRequest = () => ({
  type: FETCH_ACTIVITIES_REQUEST,
});

const fetchActivitiesSuccess = () => ({
  type: FETCH_ACTIVITIES_SUCCESS,
});

const fetchActivitiesFailure = (errMsg) => ({
  type: FETCH_ACTIVITIES_FAILURE,
  payload: errMsg,
});

const setActivityData = (activityData) => ({
  type: SET_ACTIVITY_DATA,
  payload: activityData,
});

const updateActivityData = (activityData) => ({
  type: UPDATE_ACTIVITY_DATA,
  payload: activityData,
});

// note that posting the activity does not re-fetch the user
// although the user has_many activities, for efficiency,
// user relations (w.r.t. activities) are not updated when posting an activity
const postActivity = (taskId, activity) => (dispatch) => {
  const url = `/api/v1/tasks/${taskId}/activities`;
  return fetch(url, generatePostRequest(JSON.stringify({ activity })))
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

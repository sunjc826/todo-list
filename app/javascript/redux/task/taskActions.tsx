import normalize from "json-api-normalizer";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_DATA,
  UPDATE_TASK_DATA,
  FetchTasksRequestAction,
  FetchTasksSuccessAction,
  FetchTasksFailureAction,
  SetTaskDataAction,
  UpdateTaskDataAction,
} from "./taskTypes";
import {
  fetchSubtasksRequest,
  fetchSubtasksSuccess,
  fetchSubtasksFailure,
  updateSubtaskData,
} from "../subtask/subtaskActions";
import {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  updateCommentData,
} from "../comment/commentActions";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  setUserData,
} from "../user/userActions";
import {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setProjectData,
  updateProjectData,
} from "../project/projectActions";
import {
  fetchLabelsRequest,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  setLabelData,
} from "../label/labelActions";
import {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  setTagData,
} from "../tag/tagActions";
import {
  fetchFiltersRequest,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  setFilterData,
} from "../filter/filterActions";
import {
  generateDeleteRequest,
  generatePostRequest,
  generateEditRequest,
} from "../../helperFunctions";
import { FETCH_USER_REQUEST } from "../user/userTypes";
import {
  fetchActivitiesFailure,
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  updateActivityData,
  postActivity,
} from "../activity/activityActions";
import {
  Id,
  AppThunk,
  DataRecord,
  NormalizedData,
  TaskAttributes,
} from "../shared";

const tasksUrl = "/api/v1/tasks";

const fetchTasksRequest = (): FetchTasksRequestAction => ({
  type: FETCH_TASKS_REQUEST,
});

const fetchTasksSuccess = (): FetchTasksSuccessAction => ({
  type: FETCH_TASKS_SUCCESS,
});

const fetchTasksFailure = (errMsg: string): FetchTasksFailureAction => ({
  type: FETCH_TASKS_FAILURE,
  payload: errMsg,
});

const setTaskData = (
  taskData: DataRecord<TaskAttributes>
): SetTaskDataAction => ({
  type: SET_TASK_DATA,
  payload: taskData,
});

const fetchTaskData = (taskId: Id): AppThunk => (dispatch) => {
  // note, unlike in fetchUserData, taskData is assumed to be loaded,
  // hence, no need for fetchTaskRequest
  dispatch(fetchSubtasksRequest());
  dispatch(fetchCommentsRequest());
  dispatch(fetchActivitiesRequest());
  const url = `${tasksUrl}/${taskId}`;
  fetch(url)
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
      const { task, subtask, comment, activity } = res;
      dispatch(updateSubtaskData(subtask));
      dispatch(updateCommentData(comment));
      dispatch(updateActivityData(activity));
      dispatch(fetchSubtasksSuccess());
      dispatch(fetchCommentsSuccess());
      dispatch(fetchActivitiesSuccess());
    })
    .catch((err) => {
      dispatch(fetchSubtasksFailure(err.message));
      dispatch(fetchCommentsFailure(err.message));
      dispatch(fetchActivitiesFailure(err.message));
    });
};

const updateTaskData = (
  taskData: DataRecord<TaskAttributes>
): UpdateTaskDataAction => ({
  type: UPDATE_TASK_DATA,
  payload: taskData,
});

type Task = {
  content: string;
  priority: number;
  deadline: Date | string | null;
  completed: boolean;
  project_id?: Id;
};

// no need to supply userId since the session cookie containing user_id is sent over
// and converted to @current_user
// the last 2 (tagIds, labelIds) are only relevant to filters
const postTask = (
  task: Task,
  {
    tagId,
    labelId,
    projectId,
    tagIds,
    labelIds,
  }: {
    tagId?: Id;
    labelId?: Id;
    projectId?: Id;
    tagIds?: Id[];
    labelIds?: Id[];
  }
): AppThunk<Promise<any>> => (dispatch) => {
  const post = {
    task,
    tag: { tag_id: tagId },
    label: { label_id: labelId },
    project: { project_id: projectId },
    filter: { tag_ids: tagIds, label_ids: labelIds },
  };

  return fetch(tasksUrl, generatePostRequest(JSON.stringify(post)))
    .then((res) => {
      if (res.ok) {
        return res.json().then((json) => ({
          headers: res.headers,
          json,
        }));
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(({ headers, json }): {
      headers: Headers;
      user: any;
      project: any;
    } => {
      // console.log(json);

      const { user, project } = json;
      const userObj = JSON.parse(user);
      let projectObj;
      if (project) {
        projectObj = JSON.parse(project);
      }
      return { headers, user: userObj, project: projectObj };
    })
    .then(({ headers, user, project }): {
      headers: Headers;
      user: NormalizedData;
      project: NormalizedData;
    } => {
      // console.log(user);
      // console.log(project);
      return {
        headers,
        user: normalize(user),
        project: project ? normalize(project) : null,
      };
    })
    .then((res) => {
      const { user, project, task, label, tag, filter, activity } = res.user;

      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(updateTaskData(task));
      dispatch(setLabelData(label));
      dispatch(setTagData(tag));
      dispatch(setFilterData(filter));

      if (res.project) {
        const { project, task } = res.project;
        dispatch(updateProjectData(project));
        dispatch(updateTaskData(task));
      }
      return res;
    })
    .then((res) => {
      dispatch(
        postActivity(res.headers.get("last_created_task_id"), {
          crud_type: "c",
          item: "task",
        })
      );
      return res;
    });
};

const deleteTask = (taskId: Id): AppThunk<Promise<any>> => (dispatch) => {
  const url = `${tasksUrl}/${taskId}`;
  return fetch(url, generateDeleteRequest())
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      const { user, project } = res;
      const userObj = JSON.parse(user);
      let projectObj;
      if (project) {
        projectObj = JSON.parse(project);
      }
      return { user: userObj, project: projectObj };
    })
    .then(({ user, project }): {
      user: NormalizedData;
      project: NormalizedData;
    } => {
      // dispatch(fetchTasksRequest());
      return {
        user: normalize(user),
        project: project ? normalize(project) : null,
      };
    })
    .then((res) => {
      const { user, project, task, label, tag, filter, activity } = res.user;
      // console.log("setting user");
      dispatch(setUserData(user));

      // console.log("setting project");
      dispatch(setProjectData(project));

      // TODO: Here, dispatching setTaskData before dispatching
      // tags, labels, filters
      // causes null reference errors
      // I tried to dispatch fetchXXXRequests, but I get the warning
      // Cannot update a component ("Main") while rendering a different component ("Tasks")
      // https://reactjs.org/blog/2020/02/26/react-v16.13.0.html
      // This relates to setStates, however I am dispatching actions to redux store.

      // console.log("setting label");
      dispatch(setLabelData(label));

      // console.log("setting tag");
      dispatch(setTagData(tag));
      // console.log("setting filter");
      dispatch(setFilterData(filter));

      // console.log("setting task");
      dispatch(setTaskData(task));

      // dispatch(fetchTasksSuccess());

      if (res.project) {
        const { project, task } = res.project;
        dispatch(updateProjectData(project));
        dispatch(updateTaskData(task));
      }

      return res;
    });
};

const editTask = (
  taskId: Id,
  task: Task,
  { tagIds, labelIds }: { tagIds: Id[]; labelIds: Id[] }
): AppThunk<Promise<any>> => (dispatch) => {
  const url = `${tasksUrl}/${taskId}`;
  const post = {
    task,
    filter: { tag_ids: tagIds, label_ids: labelIds },
  };
  return fetch(url, generateEditRequest(JSON.stringify(post)))
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
      const { user, project, task, label, tag, filter } = res;
      dispatch(setUserData(user));
      dispatch(setProjectData(project));
      dispatch(setTaskData(task));
      dispatch(setLabelData(label));
      dispatch(setTagData(tag));
      dispatch(setFilterData(filter));
      return res;
    })
    .then((res) => {
      dispatch(postActivity(taskId, { crud_type: "u", item: "task" }));
      return res;
    });
};

const toggleCompleteTask = (taskId: Id): AppThunk<Promise<any>> => (
  dispatch
) => {
  const url = `${tasksUrl}/${taskId}/complete`;
  return fetch(url, generateEditRequest("{}"))
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
      const { task, project } = res;
      dispatch(updateTaskData(task));
      if (project) {
        dispatch(updateProjectData(project));
      }
      return res;
    })
    .then((res) => {
      // This may be a design flaw for 2 reasons:
      // 1. One extra HTTP Request
      // 2. Generally, it is best to have "One Action, One HTTP Request" so as to decouple the front end from
      // back end. However, I deem posting of activity to be a rather trivial action, so perhaps
      // even if postActivity is not dispatched, there won't be any major issues.
      dispatch(postActivity(taskId, { crud_type: "u", item: "task" }));
      return res;
    });
};

export {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  setTaskData,
  fetchTaskData,
  updateTaskData,
  postTask,
  deleteTask,
  editTask,
  toggleCompleteTask,
};

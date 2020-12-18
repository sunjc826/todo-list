import { SET_PROJECT_DATA } from "./projectTypes";

const setProjectData = (projectData) => ({
  type: SET_PROJECT_DATA,
  payload: projectData,
});

export { setProjectData };

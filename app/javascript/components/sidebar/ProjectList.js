import React, { Fragment } from "react";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const ProjectList = ({ collapseOpen }) => {
  const userState = useSelector((state) => state.user);
  const userId = userState.userId;
  const projectState = useSelector((state) => state.project);
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;

  // https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
  const history = useHistory();

  let projectListComponent;
  if (projectLoading) {
  } else if (projectErrMsg) {
  } else {
    const projectList = [];
    // filter out projects belonging to user
    for (const key in projectData) {
      const ele = projectData[key];
      const eleUserId = ele.attributes.userId;
      if (eleUserId === userId) {
        projectList.push(ele);
      }
    }

    projectListComponent = projectList.map((project) => {
      const projectId = project.id;
      const handleClick = (e) => {
        history.push(`/project/${projectId}`);
        e.stopPropagation();
      };
      return (
        <ListGroupItem
          action
          key={projectId}
          className="px-0"
          onClick={handleClick}
        >
          <Link to={`/project/${projectId}`}>{project.attributes.title}</Link>
        </ListGroupItem>
      );
    });
  }

  return (
    <Fragment>
      <Collapse isOpen={collapseOpen}>
        <ListGroup flush>
          {projectListComponent}
          <ListGroupItem action className="px-0">
            <p className="text-secondary">
              <i className="fas fa-plus mr-1"></i>Add new Project
            </p>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </Fragment>
  );
};

export default ProjectList;

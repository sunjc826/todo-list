import React, { Fragment, useState } from "react";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NewProject from "./NewProject";
import { RootState } from "../../../redux/rootReducer";

interface AppProps {
  collapseOpen: boolean;
}

const ProjectList = ({ collapseOpen }: AppProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const userState = useSelector((state: RootState) => state.user);
  const userId = userState.userId;
  const projectState = useSelector((state: RootState) => state.project);
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
      const handleClick = (e: React.MouseEvent) => {
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

  const handleClick = (e: React.MouseEvent) => {
    toggleModal();
    e.stopPropagation();
  };

  return (
    <Fragment>
      <NewProject modalOpen={modalOpen} toggleModal={toggleModal} />
      <Collapse isOpen={collapseOpen}>
        <ListGroup flush>
          {projectListComponent}
          <ListGroupItem action className="px-0" onClick={handleClick}>
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

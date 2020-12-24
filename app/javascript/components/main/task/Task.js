import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroupItem } from "reactstrap";
import { dateToString } from "../../../helperFunctions";
import styled from "styled-components";
import TaskModal from "./taskModal/TaskModal";

const Tiny = styled.div`
  font-size: 0.7rem;
`;

const TaskContext = createContext();

const Task = ({ task, overdue }) => {
  const projectState = useSelector((state) => state.project);
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;

  const {
    completed,
    content,
    priority,
    projectId,
    dateString,
  } = task.attributes;

  let project;
  if (!projectLoading && projectId) {
    for (let id in projectData) {
      if (parseInt(id) === parseInt(projectId)) {
        project = projectData[id];
        break;
      }
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <TaskContext.Provider value={{ taskId: task.id }}>
      <ListGroupItem action>
        <TaskModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          projectTitle={project ? project.attributes.title : null}
          {...task.attributes}
        />
        <Row onClick={toggleModal}>
          <Col xs="4" className="mr-auto">
            <Row className="my-0 py-0">
              <Col xs="12">
                <p>{content}</p>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Tiny>
                  {overdue && (
                    <p className="text-danger">{dateToString(dateString)}</p>
                  )}
                </Tiny>
              </Col>
            </Row>
          </Col>
          <Col xs="4">
            {project && (
              <p className="text-right">{project.attributes.title}</p>
            )}
          </Col>
        </Row>
      </ListGroupItem>
    </TaskContext.Provider>
  );
};

export default Task;
export { TaskContext };

import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroupItem } from "reactstrap";
import { dateToString } from "../../../helperFunctions";
import styled from "styled-components";

const Tiny = styled.div`
  font-size: 0.7rem;
`;

const OverdueTask = ({ task }) => {
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
  console.log(task);
  // Todo: change to more robust code handling loading and errors
  let project;
  if (!projectLoading && projectId) {
    for (let id in projectData) {
      if (parseInt(id) === parseInt(projectId)) {
        project = projectData[id];
        break;
      }
    }
  }
  console.log(project);

  return (
    <ListGroupItem action>
      <Row>
        <Col xs="4" className="mr-auto">
          <Row className="my-0 py-0">
            <Col xs="12">
              <p>{content}</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Tiny>
                <p className="text-danger">{dateToString(dateString)}</p>
              </Tiny>
            </Col>
          </Row>
        </Col>
        <Col xs="4">
          {project && <p className="text-right">{project.attributes.title}</p>}
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default OverdueTask;

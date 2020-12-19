import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Subtask from "./Subtask";

const SubtaskTab = ({ taskRelations }) => {
  const subtaskState = useSelector((state) => state.subtask);

  const subtaskLoading = subtaskState.loading;
  const subtaskErrMsg = subtaskState.errMsg;
  const subtaskData = subtaskState.data;

  let subtasksComponent;
  if (subtaskLoading) {
  } else if (subtaskErrMsg) {
  } else {
    // instead of filtering out all the subtasks with foreign key === taskId,
    // directly access the subtasks that are related to taskId
    const subtasks = taskRelations.subtasks.data.map((ele) => {
      const subtaskId = ele.id;
      return subtaskData[subtaskId];
    });

    subtasksComponent = subtasks.map((subtask) => {
      return (
        <Row key={subtask.id}>
          <Col xs="12">
            <Subtask {...subtask.attributes} />
          </Col>
        </Row>
      );
    });
  }

  return (
    <Row>
      <Col xs="12">
        <ListGroup flush>{subtasksComponent}</ListGroup>
      </Col>
    </Row>
  );
};

// TODO: ListGroup flush not working?

export default SubtaskTab;
